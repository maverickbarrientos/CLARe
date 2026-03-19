from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_session
from datetime import datetime
from database.base import Users

from config.security import fastapi_users, current_active_user

from services.computer_lab_service import ComputerLabService
from services.reservation_service import ReservationService
from services.cancellation_request_service import CancellationRequestService
from services.lab_class_service import LabClassService

from schemas.reservation_schemas import UserReservationCreate, ReservationUpdate
from schemas.cancellation_request_schema import CancellationRequestCreate

users_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

def reservation_service_dependency(session: AsyncSession = Depends(get_session)) -> ReservationService:
    return ReservationService(session)

def cancellation_service_dependency(session: AsyncSession = Depends(get_session)) -> CancellationRequestService:
    return CancellationRequestService(session)

def lab_class_service_dependency(session: AsyncSession = Depends(get_session)) -> LabClassService:
    return LabClassService(session)

@users_router.get("/")
async def user(
    user: Users = Depends(current_active_user),
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    upcoming_reservation = await reservation_service.get_upcoming_reservation(user.id)

    return upcoming_reservation

@users_router.get("/computer_labs")
async def get_active_computer_labs(
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_labs = await computer_lab_service.get_active_labs()
    
    return computer_labs

@users_router.get("/computer_lab/{computer_lab_id}")
async def computer_lab(
    computer_lab_id: int,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_lab_reservations = await computer_lab_service.get_lab_by_id(computer_lab_id)
    
    return computer_lab_reservations

@users_router.get("/reservation/{reservation_id}")
async def get_reservation(
    reservation_id: int,
    user: Users = Depends(current_active_user),
    reservation_service: ReservationService = Depends(reservation_service_dependency) 
):
    
    reservation = await reservation_service.get_reservation_by_id(reservation_id)
    
    return reservation

@users_router.post("/create_reservation")
async def create_reservation(
    reservation: UserReservationCreate,
    user: Users = Depends(current_active_user),
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    new_reservation = await reservation_service.user_create_reservation(reservation, user)
    
    return new_reservation

@users_router.patch("/update_reservation/{reservation_id}")
async def update_reservation(
    reservation_id: int,
    payload: ReservationUpdate,
    user: Users = Depends(current_active_user),
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    updated_reservation = await reservation_service.user_update_reservation(user.id, payload, reservation_id)
    
    return updated_reservation

@users_router.post("/request_cancellation")
async def request_cancellation(
    payload: CancellationRequestCreate,
    user: Users = Depends(current_active_user),
    cancellation_service: CancellationRequestService = Depends(cancellation_service_dependency)
):
    
    cancellation_request = await cancellation_service.create_request(user.id, payload)
    
    return cancellation_request

@users_router.delete("/delete_reservation")
async def delete_reservation(
    user_id: int,
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)  
):
    
    result = await reservation_service.user_delete_reservation(reservation_id, user_id)
    
    return result


@users_router.get("/class")
async def get_class(
    user: Users = Depends(current_active_user),
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    lab_class = await lab_class_service.get_all_class()
    
    return lab_class