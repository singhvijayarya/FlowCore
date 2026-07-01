from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.dependencies.db import get_db
from app.dependencies.auth import get_current_user
from app.middleware.role import admin_required
from app.models.user import User
from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

from app.services.task_service import (
    create_task,
    get_tasks,
    get_task,
    update_task,
    delete_task,
    get_all_tasks,
)
router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"],
)


@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return create_task(
        db=db,
        task=task,
        owner_id=current_user.id,
    )


@router.get(
    "/",
    response_model=List[TaskResponse],
)
def read_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_tasks(
        db=db,
        owner_id=current_user.id,
    )

@router.get(
    "/all",
    response_model=list[TaskResponse],
)
def read_all_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    admin_required(current_user)

    return get_all_tasks(db)

@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def read_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    task = get_task(
        db=db,
        task_id=task_id,
        owner_id=current_user.id,
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task
@router.put(
    "/{task_id}",
    response_model=TaskResponse,
)
def edit_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    db_task = get_task(
        db=db,
        task_id=task_id,
        owner_id=current_user.id,
    )

    if not db_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return update_task(
        db=db,
        db_task=db_task,
        task=task,
    )
@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    db_task = get_task(
        db=db,
        task_id=task_id,
        owner_id=current_user.id,
    )

    if not db_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    delete_task(
        db=db,
        db_task=db_task,
    )

    return
