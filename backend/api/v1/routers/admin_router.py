from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from services.computer_lab_service import ComputerLabService
from database.session import get_session

admin_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

@admin_router.get("/")
async def index():
    pass

@admin_router.get("/computer_labs")
async def get_computer_labs(
            session: AsyncSession = Depends(get_session),
            computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
        ):
    
    computer_labs = await computer_lab_service.get_computer_labs()
    
    return { "computer_labs" : computer_labs }

@admin_router.post("/create_lab")
async def create_lab():
    pass