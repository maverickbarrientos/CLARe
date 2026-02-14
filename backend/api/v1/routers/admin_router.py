from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from config.security import UserManager, get_user_manager, fastapi_users, current_active_user
from services.computer_lab_service import ComputerLabService
from services.user_service import UserService
from services.reservation_service import ReservationService
from database.session import get_session

from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate
from schemas.user_schemas import UserCreate, UserRead, UserInformationCreate, UserInformationUpdate
from schemas.reservation_schemas import ReservationCreate, ReservationUpdate, ReservationStatus

admin_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

def user_service_dependency(session: AsyncSession = Depends(get_session)) -> AsyncSession:
    return UserService(session) 

def reservation_service_dependency(session: AsyncSession = Depends(get_session)) -> ReservationService:
    return ReservationService(session)

@admin_router.get("/")
async def index():
    pass

"""

ADMIN - COMPUTER LABS ROUTE

"""

@admin_router.get("/computer_labs", response_model=dict[str, list[ComputerLabResponse]])
async def get_computer_labs(
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency),
):

    computer_labs = await computer_lab_service.get_all_labs()
    
    return { "computer_labs" : computer_labs }

@admin_router.get("/computer_lab/{lab_id}", response_model=dict[str, ComputerLabResponse])
async def get_lab_by_id(
    lab_id: int,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_lab = await computer_lab_service.get_lab_by_id(lab_id)
    
    return { "computer_lab" : computer_lab }

@admin_router.post("/create_lab", response_model=dict[str, ComputerLabResponse])
async def create_lab(
    computer_lab: ComputerLabCreate,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    new_lab = await computer_lab_service.create_lab(computer_lab)
    
    return { "computer_lab" : new_lab }

@admin_router.patch("/update_lab", response_model=dict[str, ComputerLabResponse])
async def update_lab(
    lab_id: int,
    computer_lab: ComputerLabUpdate,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    updated_lab = await computer_lab_service.update_lab(lab_id, computer_lab)
    
    return { "computer_lab" : updated_lab }

@admin_router.delete("/delete_lab", response_model=dict[str, str])
async def delete_lab(
    lab_id: int,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    result = await computer_lab_service.delete_lab(lab_id)
    
    return { "status" : result }


"""
ADMIN - USERS ROUTE

"""
@admin_router.get("/users")
async def get_users(
    user_service: UserService = Depends(user_service_dependency)
):
    
    users = await user_service.get_all_users()
    
    return { "users" : users }

@admin_router.get("/user/{user_id}")
async def get_user_by_id(
    user_id: int,
    user_service: UserService = Depends(user_service_dependency)
):
    
    user = await user_service.get_user_by_id(user_id)
    
    return { "user" : user } 

@admin_router.post("/create_user")
async def create_user(
    user: UserCreate,
    user_information: UserInformationCreate,
    user_service: UserService = Depends(user_service_dependency),
    user_manager: UserManager = Depends(get_user_manager)
):
    
    new_user = await user_service.create_user(user, user_information, user_manager)
    
    return { "new_user" : new_user }

@admin_router.patch("/update_user")
async def update_user(
    user_id: int,
    payload: UserInformationUpdate,
    user_service: UserService = Depends(user_service_dependency)
):
    
    updated_user = await user_service.update_user(user_id, payload)
    
    return updated_user

"""

ADMIN - RESERVATION ROUTE

"""

@admin_router.get("/reservations")
async def get_all_reservations(
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservations = await reservation_service.get_all_reservations()
    
    return { "reservations" : reservations }

@admin_router.get("/reservation/{reservation_id}")
async def get_reservation_by_id(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    reservation = await reservation_service.get_reservation_by_id(reservation_id)
    
    return reservation

@admin_router.get("/search_reservation")
async def search_reservation(
    search_query: Optional[str] = None,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservations = await reservation_service.search_reservation(search_query)
    
    return reservations

@admin_router.post("/create_reservation")
async def create_reservation(
    reservation: ReservationCreate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
  new_reservation = await reservation_service.create_reservation(reservation)  
  
  return { "reservation" : new_reservation }

@admin_router.delete("/delete_reservation")
async def delete_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    result = await reservation_service.delete_reservation(reservation_id)
    
    return { "message" : result }

@admin_router.patch("/update_reservation")
async def update_reservation(
    reservation_id: int,
    payload: ReservationUpdate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    updated_reservation = await reservation_service.update_reservation(payload, reservation_id)
    
    return { "reservation" : updated_reservation }

@admin_router.patch("/reservation/{reservation_id}/approve")
async def approve_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservation = await reservation_service.update_reservation_status(reservation_id, ReservationStatus.reserved)
    
    return reservation

@admin_router.patch("/reservation/{reservation_id}/reject")
async def reject_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservation = await reservation_service.update_reservation_status(reservation_id, ReservationStatus.rejected)
    
    return reservation