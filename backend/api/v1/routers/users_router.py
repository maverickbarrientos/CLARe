from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_session

from services.computer_lab_service import ComputerLabService
from services.reservation_service import ReservationService
from services.cancellation_request_service import CancellationRequestService

from schemas.reservation_schemas import ReservationCreate, ReservationUpdate
from schemas.cancellation_request_schema import CancellationRequestCreate

users_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

def reservation_service_dependency(session: AsyncSession = Depends(get_session)) -> ReservationService:
    return ReservationService(session)

def cancellation_service_dependency(session: AsyncSession = Depends(get_session)) -> CancellationRequestService:
    return CancellationRequestService(session)

@users_router.get("/")
async def user(
    user_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    user_reservation = await reservation_service.get_user_reservation(user_id)
    
    return user_reservation

@users_router.get("/computer_labs")
async def get_computer_labs(
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_labs = await computer_lab_service.get_all_labs()
    
    return computer_labs

@users_router.get("/computer_lab")
async def computer_lab(
    computer_lab_id: int,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_lab_reservations = await computer_lab_service.get_lab_reservations(computer_lab_id)
    
    return computer_lab_reservations

@users_router.post("/create_reservation")
async def create_reservation(
    reservation: ReservationCreate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    new_reservation = await reservation_service.user_create_reservation(reservation)
    
    return new_reservation

@users_router.patch("/update_reservation")
async def update_reservation(
    user_id: int,
    reservation_id: int,
    payload: ReservationUpdate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    updated_reservation = await reservation_service.user_update_reservation(user_id, payload, reservation_id)
    
    return updated_reservation

@users_router.post("/request_cancellation")
async def request_cancellation(
    user_id: int,
    reservation_id: int,
    payload: CancellationRequestCreate,
    cancellation_service: CancellationRequestService = Depends(cancellation_service_dependency)
):
    
    cancellation_request = await cancellation_service.create_request(user_id, reservation_id, payload)
    
    return cancellation_request

@users_router.delete("/delete_reservation")
async def delete_reservation(
    user_id: int,
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)  
):
    
    result = await reservation_service.user_delete_reservation(reservation_id, user_id)
    
    return result