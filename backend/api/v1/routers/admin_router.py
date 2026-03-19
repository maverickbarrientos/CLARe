from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from datetime import date, timedelta

from api.v1.sockets import sio

from config.security import UserManager, get_user_manager
from services.computer_lab_service import ComputerLabService
from services.user_service import UserService
from services.reservation_service import ReservationService
from services.qr_code_service import QRCodeService
from services.cancellation_request_service import CancellationRequestService
from services.lab_class_service import LabClassService
from database.session import get_session

from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate
from schemas.user_schemas import UserCreate, UserInformationCreate, UserInformationUpdate, UserResponse, UserCreateResponse, UserUpdate
from schemas.reservation_schemas import ReservationCreate, AdminReservationCreate, ReservationUpdate, ReservationStatus, ReservationResponse, ReservationCreateResponse
from schemas.qr_code_schemas import QRCodeWithReservation, QRCodeResponse, ApprovalResponse
from schemas.lab_class_schemas import LabClassCreate, LabClassResponse, LabClassUpdate

admin_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

def user_service_dependency(session: AsyncSession = Depends(get_session)) -> UserService:
    return UserService(session) 

def reservation_service_dependency(session: AsyncSession = Depends(get_session)) -> ReservationService:
    return ReservationService(session)

def qr_service_dependency(session: AsyncSession = Depends(get_session)) -> QRCodeService:
    return QRCodeService(session)

def cancellation_service_dependency(session: AsyncSession = Depends(get_session)) -> CancellationRequestService:
    return CancellationRequestService(session)

def lab_class_service_dependency(session: AsyncSession = Depends(get_session)) -> LabClassService:
    return LabClassService(session)

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

@admin_router.get("/computer_lab/{lab_id}")
async def get_lab_by_id(
    lab_id: int,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_lab = await computer_lab_service.get_lab_by_id(lab_id)
    
    return { "computer_lab" : computer_lab }

@admin_router.post("/create_lab")
async def create_lab(
    computer_lab: ComputerLabCreate,
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    new_lab = await computer_lab_service.create_lab(computer_lab)
    
    return { "computer_lab" : new_lab }

@admin_router.patch("/update_lab/{lab_id}")
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
@admin_router.get("/users", response_model=dict[str, list[UserResponse]])
async def get_users(
    search: Optional[str] = None,
    user_service: UserService = Depends(user_service_dependency)
):
    
    users = await user_service.get_all_users(search)
    
    return { "users" : users }

@admin_router.get("/user/{user_id}", response_model=UserResponse)
async def get_user_by_id(
    user_id: int,
    user_service: UserService = Depends(user_service_dependency)
):
    
    user = await user_service.get_user_by_id(user_id)
    
    return user

@admin_router.post("/create_user", response_model=UserCreateResponse)
async def create_user(
    user: UserCreate,
    user_information: UserInformationCreate,
    user_service: UserService = Depends(user_service_dependency),
    user_manager: UserManager = Depends(get_user_manager)
):
    
    new_user = await user_service.create_user(user, user_information, user_manager)
    
    return  new_user

@admin_router.patch("/update_user/{user_id}")
async def update_user(
    user_id: int,
    user: UserUpdate,
    user_information: UserInformationUpdate,
    user_service: UserService = Depends(user_service_dependency),
    user_manager: UserManager = Depends(get_user_manager)
):
    
    updated_user = await user_service.update_user(user_id, user, user_information, user_manager)
    
    return updated_user

@admin_router.delete("/delete_user/{user_id}", response_model=dict[str, str])
async def delete_user(
    user_id: int,
    user_service: UserService = Depends(user_service_dependency),
    user_manager: UserManager = Depends(get_user_manager)
):
    
    result = await user_service.delete_user(user_id, user_manager)
    
    return { "message" : result }

"""

ADMIN - RESERVATION ROUTE

"""

@admin_router.get("/reservations", response_model=dict[str, list[ReservationResponse]])
async def get_all_reservations(
    search: Optional[str] = None,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservations = await reservation_service.get_all_reservations(search)
    
    return { "reservations" : reservations }

@admin_router.get("/user_reservations/{user_id}")
async def get_user_reservations(
    user_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    user_reservations = await reservation_service.get_user_reservations(user_id)
    
    return user_reservations

@admin_router.get("/reservation/{reservation_id}", response_model=dict[str, ReservationResponse])
async def get_reservation_by_id(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    reservation = await reservation_service.get_reservation_by_id(reservation_id)
    
    return { "reservation" : reservation }

@admin_router.post("/custom_reservation", response_model=dict[str, ReservationCreateResponse])
async def custom_reservation(
    reservation: AdminReservationCreate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):

  new_reservation = await reservation_service.create_reservation(reservation)
  
  return { "reservation" : new_reservation }

@admin_router.delete("/delete_reservation", response_model=dict[str, str])
async def delete_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    result = await reservation_service.delete_reservation(reservation_id)
    
    return { "message" : result }

@admin_router.patch("/update_reservation/{reservation_id}")
async def update_reservation(
    reservation_id: int,
    payload: ReservationUpdate,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    updated_reservation = await reservation_service.update_reservation(payload, reservation_id)
    
    return { "reservation" : updated_reservation }

@admin_router.patch("/reservation/{reservation_id}/approve", response_model=ApprovalResponse)
async def approve_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency),
    qr_code_service: QRCodeService = Depends(qr_service_dependency)
):
    
    reservation = await reservation_service.update_reservation_status(reservation_id, ReservationStatus.reserved)
    
    if reservation:
        qr_payload = await qr_code_service.generate_qr_data(reservation)
        qr_code = await qr_code_service.create_qr_code(qr_payload)
    
    return { "reservation" : reservation, "qr_code" : qr_code }

@admin_router.patch("/reservation/{reservation_id}/reject", response_model=ReservationCreateResponse)
async def reject_reservation(
    reservation_id: int,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    reservation = await reservation_service.update_reservation_status(reservation_id, ReservationStatus.rejected)
    
    return reservation

@admin_router.patch("/reject_cancellation/{reservation_id}")
async def reject_cancellation(
    reservation_id: int,
    admin_note: str,
    cancellation_service: CancellationRequestService = Depends(cancellation_service_dependency)
):
    
    result = await cancellation_service.reject_request(reservation_id, admin_note)
    
    return result

@admin_router.patch("/approve_cancellation/{reservation_id}")
async def approve_cancellation(
    reservation_id: int,
    cancellation_service: CancellationRequestService = Depends(cancellation_service_dependency)
):
    
    result = await cancellation_service.approve_request(reservation_id)
    
    return result

@admin_router.patch('/verify_qr_code')
async def verify_qr_code(
    qr_value: str,
    qr_code_service: QRCodeService = Depends(qr_service_dependency),
):
    
    qr_with_reservation = await qr_code_service.verify_qr(qr_value)
    await sio.emit("reservation_status_update", jsonable_encoder(qr_with_reservation))
    
    return qr_with_reservation

@admin_router.patch("/qr_code/{qr_value}/invalidate")
async def invalidate_qr(
    qr_value: str,
    qr_code_service: QRCodeService = Depends(qr_service_dependency)
):
    
    result = await qr_code_service.invalidate_qr_code(qr_value)
    
    return result

@admin_router.get("/class")
async def get_class(
    day: Optional[str] = None,
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    lab_class = await lab_class_service.get_all_class(day)
    
    return lab_class

@admin_router.get("/class/{class_id}")
async def get_class_by_id(
    class_id: int,
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    lab_class = await lab_class_service.get_class_by_id(class_id)
    
    return lab_class

@admin_router.post("/create_class")
async def create_class(
    payload: LabClassCreate,
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    lab_class = await lab_class_service.create_class(payload)
    
    return lab_class

@admin_router.patch("/update_class/{class_id}")
async def update_class(
    class_id: int,
    payload: LabClassUpdate,
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    updated_class = await lab_class_service.update_class(class_id, payload)
    
    return updated_class

@admin_router.delete("/delete_class/{class_id}")
async def delete_class(
    class_id: int,
    lab_class_service: LabClassService = Depends(lab_class_service_dependency)
):
    
    result = await lab_class_service.delete_class(class_id)
    
    return result

@admin_router.get("/weekly_events")
async def get_weekly_events(
    start_of_week: date = None,
    reservation_service: ReservationService = Depends(reservation_service_dependency)
):
    
    if not start_of_week:
        today = date.today()
        start_of_week = today - timedelta(days=today.weekday())
        
    end_of_week = start_of_week + timedelta(days=6)
    
    weekly_events = await reservation_service.get_weekly_events(start_of_week, end_of_week)
    
    return weekly_events