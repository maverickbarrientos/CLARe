from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime, timedelta

from models.reservation import Reservation, ReservationStatus
from database.base import Users
from models.computer_lab import ComputerLab
from models.users_information import UsersInformation


class DashboardService:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_dashboard(self):

        seven_days_ago = datetime.now() - timedelta(days=7)
        active_statuses = [ReservationStatus.reserved, ReservationStatus.pending, ReservationStatus.in_use]

        try:

            # --- Most Used Lab ---
            most_used_stmt = (
                select(ComputerLab.lab_name, func.count(Reservation.id).label("count"))
                .join(Reservation, Reservation.lab_id == ComputerLab.id)
                .where(Reservation.start_date >= seven_days_ago)
                .group_by(ComputerLab.id)
                .order_by(func.count(Reservation.id).desc())
                .limit(1)
            )
            most_used_result = await self.session.execute(most_used_stmt)
            most_used = most_used_result.first()

            # --- Reservation Counts by Status ---
            counts_stmt = (
                select(
                    func.sum(case((Reservation.status == ReservationStatus.reserved, 1), else_=0)).label("reserved"),
                    func.sum(case((Reservation.status == ReservationStatus.pending, 1), else_=0)).label("pending"),
                    func.sum(case((Reservation.status == ReservationStatus.in_use, 1), else_=0)).label("in_use"),
                )
            )
            counts_result = await self.session.execute(counts_stmt)
            counts = counts_result.first()

            # --- Active Reservations ---
            active_stmt = (
                select(Reservation)
                .join(Reservation.user)
                .join(Users.users_information)
                .join(Reservation.computer_labs)
                .where(Reservation.status.in_(active_statuses))
                .options(
                    joinedload(Reservation.user).joinedload(Users.users_information),
                    joinedload(Reservation.computer_labs),
                )
            )
            active_result = await self.session.execute(active_stmt)
            active_reservations = active_result.unique().scalars().all()

            # --- Chart: reservations per day (last 7 days) ---
            chart_stmt = (
                select(
                    func.date(Reservation.start_date).label("date"),
                    func.count(Reservation.id).label("count")
                )
                .where(Reservation.start_date >= seven_days_ago)
                .group_by(func.date(Reservation.start_date))
                .order_by(func.date(Reservation.start_date))
            )
            chart_result = await self.session.execute(chart_stmt)
            chart_rows = chart_result.all()

        except SQLAlchemyError as e:
            print(f"Database error in get_dashboard: {e}")
            raise HTTPException(status_code=500, detail="Failed to fetch dashboard data")

        # Fill missing days with 0
        chart_map = {str(row.date): row.count for row in chart_rows}
        chart = []
        for i in range(7):
            day = (seven_days_ago + timedelta(days=i)).date()
            chart.append({
                "date": day.strftime("%b %d"),
                "count": chart_map.get(str(day), 0)
            })

        return {
            "most_used_lab": {
                "lab_name": most_used.lab_name if most_used else "N/A",
                "count": most_used.count if most_used else 0,
            },
            "reservations": {
                "reserved": counts.reserved or 0,
                "pending": counts.pending or 0,
                "in_use": counts.in_use or 0,
            },
            "active_reservations": [
                {
                    "id": r.id,
                    "full_name": r.full_name,
                    "lab_name": r.computer_labs.lab_name,
                    "date": r.start_date.strftime("%b %d, %Y"),
                    "status": r.status,
                }
                for r in active_reservations
            ],
            "chart": chart,
        }