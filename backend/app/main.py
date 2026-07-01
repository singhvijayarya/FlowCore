from fastapi import FastAPI
from app.database.database import Base, engine
from app.models import User, Task
from app.api.v1.users import router as users_router
from app.api.v1.tasks import router as task_router
from app.api.v1.auth import router as auth_router
from app.core.exceptions import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
    version="1.0.0",
    description="Backend Assignment for Primetrade.ai",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(task_router)

@app.get("/")
def root():
    return {
        "message": "Task Manager API Running Successfully"
    }