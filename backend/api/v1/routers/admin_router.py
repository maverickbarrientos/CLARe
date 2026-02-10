from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from services.computer_lab_service import ComputerLabService
from database.session import get_session

from schemas.computer_lab_schema import ComputerLabCreate, ComputerLabResponse, ComputerLabUpdate

admin_router = APIRouter()

def computer_lab_service_dependency(session: AsyncSession = Depends(get_session)) -> ComputerLabService:
    return ComputerLabService(session)

@admin_router.get("/")
async def index():
    pass

"""

ADMIN - COMPUTER LABS ROUTE

"""
@admin_router.get("/computer_labs", response_model=dict[str, list[ComputerLabResponse]])
async def get_computer_labs(
    computer_lab_service: ComputerLabService = Depends(computer_lab_service_dependency)
):
    
    computer_labs = await computer_lab_service.get_computer_labs()
    
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
async def get_users():
    pass