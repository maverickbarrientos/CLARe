
from typing import Optional
from fastapi import Depends, Request, Response
from database.base import Users
from fastapi_users import BaseUserManager, FastAPIUsers, IntegerIDMixin
from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy

from database.base import get_user_db

import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

class UserManager(IntegerIDMixin, BaseUserManager[Users, int]):
    verification_token_secret = JWT_SECRET
    reset_password_token_secret = JWT_SECRET
    
    async def on_after_login(self, user: Users, request: Optional[Request], response: Optional[Response]):
        print(f"User ID {user.id} logged in")
        
    async def on_after_register(self, user: Users, request: Request):
        print(f"User ID {user.id} has been registered")
        
    async def on_after_request_verify(self, user: Users, token: str, request: Optional[Request]):
        print(f"Verification request from User ID {user.id}. Token : {token}")
        
def get_user_manager(user_db= Depends(get_user_db)):
    yield UserManager(user_db)
        
def get_strategy():
    return JWTStrategy(secret=JWT_SECRET, lifetime_seconds=3600)

bearer = BearerTransport(tokenUrl="/auth/jwt/login")
auth_backend = AuthenticationBackend(name="jwt", 
                                     transport=bearer, 
                                     get_strategy=get_strategy)

fastapi_users = FastAPIUsers(get_user_manager=get_user_manager,
                             auth_backends=[auth_backend])

current_active_user = fastapi_users.current_user