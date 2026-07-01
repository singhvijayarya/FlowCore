from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models import User
from app.core.security import create_access_token, verify_password
from app.dependencies.db import get_db
# from app.schemas.user import UserRegister, UserLogin, UserResponse
from app.schemas.user import UserRegister, UserResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.services.user_service import (
    create_user,
    get_user_by_email,
    authenticate_user,
)
from app.core.security import create_access_token, verify_password

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return create_user(db, user)


 
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    db_user = authenticate_user(
        db,
        form_data.username,
        form_data.password,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {
            "user_id": db_user.id,
            "role": db_user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post("/debug")
def debug(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = get_user_by_email(db, form_data.username)

    if not user:
        return {"message": "User Not Found"}

    return {
        "email": user.email,
        "db_password": user.password,
        "verify": verify_password(
            form_data.password,
            user.password,
        ),
    }