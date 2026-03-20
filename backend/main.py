from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from fastapi_apscheduler.scheduler import AsyncIOScheduler
from contextlib import asynccontextmanager
import socketio, uvicorn

from config.security import fastapi_users, auth_backend, get_user_manager, UserManager
from database.base import create_tables
from database.session import get_session, async_session

from api.v1.routers.admin_router import admin_router
from api.v1.routers.users_router import users_router

from schemas.user_schemas import UserRead, UserCreate, UserRegistration, UserUpdate

from services.user_service import UserService
from services.reservation_service import ReservationService
from services.qr_code_service import QRCodeService

from api.v1.sockets import sio

scheduler = AsyncIOScheduler()

@asynccontextmanager
async def get_session_context():
    async with async_session() as session:
        yield session
        
async def schedule_update_completed():
    async with get_session_context() as session:
        reservation_service = ReservationService(session)
        await reservation_service.update_reservation_complete()

async def schedule_invalidate_qr_code():
    async with get_session_context() as session:
        qr_code_service = QRCodeService(session)
        await qr_code_service.invalidate_expired_qr_codes()
        
async def schedule_unscanned_reservations():
    async with get_session_context() as session:
        reservation_service = ReservationService(session)
        await reservation_service.cancel_unscanned_reservations()
        
def add_interval_job(func, job_id):
    scheduler.add_job(
        func=func,
        trigger="interval",
        minutes=1,
        max_instances=1,
        misfire_grace_time=60,
        id=job_id
    )

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    
    add_interval_job(schedule_update_completed, "update_completed_reservation")
    add_interval_job(schedule_invalidate_qr_code, "invalidate_expired_qr_codes")
    add_interval_job(schedule_unscanned_reservations, "schedule_unscanned_reservations")
    
    scheduler.start()
    yield
    scheduler.shutdown()
        
def user_service_dependency(session: AsyncSession = Depends(get_session)) -> UserService:
    return UserService(session) 

app = FastAPI(lifespan=lifespan, root_path="/")
origins = ["*"]
socketio_app = socketio.ASGIApp(sio, app)

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/auth/users", tags=["auth"])
app.include_router(admin_router, tags=["admin"], prefix="/admin")
app.include_router(users_router, tags=["user"], prefix="/user")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Allows specified origins
    allow_credentials=True,         # Allows cookies/credentials to be included in requests
    allow_methods=["*"],            # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],            # Allows all headers
)

@app.get("/")
async def index():
    return { "Message" : "FastAPI Boilerplate" }

@app.post("/auth/register", tags=["auth"])
async def register(
    registration: UserRegistration,
    user_manager: UserManager = Depends(get_user_manager),
    user_service: UserService = Depends(user_service_dependency)
):
    
    user = await user_service.create_user(registration.user, registration.user_information, user_manager) 
    
    return user

if __name__ == "__main__":
    uvicorn.run("main:socketio_app", host="0.0.0.0", port=8000, reload=True)