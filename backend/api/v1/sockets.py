import socketio, os
from fastapi.encoders import jsonable_encoder
from jose import jwt
from dotenv import load_dotenv

from database.session import async_session
from services.user_service import UserService
from services.reservation_service import ReservationService
from services.cancellation_request_service import CancellationRequestService

from schemas.reservation_schemas import AdminReservationCreate, ReservationStatus, UserReservationCreate

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
sio = socketio.AsyncServer(
    async_mode="asgi", cors_allowed_origins="*"
)

@sio.event
async def connect(sid, environ):
    print(f"Connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Disconnected: {sid}")

@sio.event
async def create_reservation(sid, data):
    
    try:
        payload = AdminReservationCreate(**data)

        async with async_session() as session:
            reservation_service = ReservationService(session)
            result = await reservation_service.create_reservation(payload)

        await sio.emit("reservation_created", {
            "status": "success",
            "reservation": jsonable_encoder(result)
        })

    except ValueError as e:
        await sio.emit("reservation_error", {
            "status": "error",
            "message": str(e)
        })

    except Exception as e:
        await sio.emit("reservation_error", {
            "status": "error",
            "message": "An unexpected error occurred. Please try again."
        })
        print(f"Error in create_reservation: {e}")

@sio.event
async def approve_reservation(sid, reservation_id):
    async with async_session() as session:
        reservation_service = ReservationService(session)
        result = await reservation_service.approve_reservation(int(reservation_id), ReservationStatus.reserved)
    await sio.emit("reservation_status_update", jsonable_encoder(result))
    
@sio.event  
async def reject_reservation(sid, reservation_id, reject_reason):
    async with async_session() as session:
        reservation_service = ReservationService(session)
        result = await reservation_service.reject_reservation(int(reservation_id), reject_reason, ReservationStatus.rejected)
    await sio.emit("reservation_status_update", jsonable_encoder(result))

@sio.event
async def approve_cancellation(sid, reservation_id):
    async with async_session() as session:
        cancellation_service = CancellationRequestService(session)
        result = await cancellation_service.approve_request(int(reservation_id))
    await sio.emit("reservation_status_update", jsonable_encoder(result))
    
@sio.event
async def reject_cancellation(sid, reservation_id, reject_reason):
    
    async with async_session() as session:
        cancellation_service = CancellationRequestService(session)
        result = await cancellation_service.reject_request(reservation_id, reject_reason)
    await sio.emit("reservation_status_update", jsonable_encoder(result))

@sio.event
async def user_create_reservation(sid, data):
    session_data = await sio.get_session(sid)
    user_id = session_data.get("user_id")
    
    print(user_id, data)
    if not user_id:
        return
    
    payload = UserReservationCreate(**data)
    
    async with async_session() as session:
        user_service = UserService(session)
        user = await user_service.get_user_by_id(user_id)
        
        reservation_service = ReservationService(session)
        result = await reservation_service.user_create_reservation(payload, user)
    
    await sio.emit("new_reservation", jsonable_encoder(result))
    await sio.emit("reservations", jsonable_encoder(result))
    
@sio.event
async def authenticate(sid, data):
    try:
        token = data.get("token")
        print(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"], audience="fastapi-users:auth")
        user_id = int(payload.get("sub"))
        await sio.save_session(sid, {"user_id" : user_id});
        
    except Exception as e:
        print(e)
        await sio.disconnect(sid)