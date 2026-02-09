from fastapi import APIRouter

users_router = APIRouter()

@users_router.get("/")
def index():
    pass