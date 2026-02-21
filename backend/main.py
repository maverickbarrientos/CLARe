from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config.security import fastapi_users, auth_backend
from database.base import create_tables

from api.v1.routers.admin_router import admin_router
from api.v1.routers.users_router import users_router

from schemas.user_schemas import UserRead, UserCreate, UserUpdate

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield

app = FastAPI(lifespan=lifespan)
origins = ["*"]

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])

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