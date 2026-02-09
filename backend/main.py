from fastapi import FastAPI
from contextlib import asynccontextmanager

from auth.users import fastapi_users, auth_backend
from database.base import create_tables

from api.v1.routers.admin_router import admin_router

from schemas.user_schemas import UserRead, UserCreate, UserUpdate

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])

app.include_router(admin_router, tags=["admin"], prefix="/admin")

@app.get("/")
async def index():
    return { "Message" : "FastAPI Boilerplate" }