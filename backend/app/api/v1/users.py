from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user

from app.middleware.role import admin_required

from app.models.user import User

from app.schemas.user import UserResponse

from app.services.user_service import get_all_users
from typing import List
router = APIRouter(
    prefix="/api/v1/users",
    tags=["Users"],
)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_profile(current_user=Depends(get_current_user)):
    return current_user

@router.get(
    "/",
    response_model=List[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    admin_required(current_user)

    return get_all_users(db)