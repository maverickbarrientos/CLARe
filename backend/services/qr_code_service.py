from fastapi import HTTPException

from .base import BaseService
from models.qr_code import QRCode

class QRCodeService(BaseService):
    
    async def create_qr_code(self):
        pass