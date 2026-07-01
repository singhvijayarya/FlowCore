from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


def create_task(db: Session, task: TaskCreate, owner_id: int):

    db_task = Task(
        title=task.title,
        description=task.description,
        owner_id=owner_id,
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def get_tasks(db: Session, owner_id: int):

    return db.query(Task).filter(
        Task.owner_id == owner_id
    ).all()


def get_task(db: Session, task_id: int, owner_id: int):

    return db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == owner_id,
    ).first()


def update_task(db: Session, db_task: Task, task: TaskUpdate):

    data = task.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)

    return db_task


def delete_task(db: Session, db_task: Task):

    db.delete(db_task)
    db.commit()
def get_all_tasks(db: Session):
    return db.query(Task).all()