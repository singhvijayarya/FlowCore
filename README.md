# FlowCore

> A scalable full-stack task management application built with FastAPI, React, PostgreSQL, JWT Authentication, and Role-Based Access Control (RBAC).

---

## Overview

FlowCore is a modern task management platform designed with security, scalability, and clean architecture in mind.

The application allows users to securely register, authenticate using JWT, manage their personal tasks, and provides a dedicated Admin Dashboard for monitoring users and tasks.

---

# Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt

---

## Authorization

- User Role
- Admin Role
- Protected Routes
- Role-Based Access Control (RBAC)

---

## User Dashboard

Users can:

- Create Tasks
- View Their Tasks
- Update Tasks
- Delete Tasks
- Logout Securely

---

## Admin Dashboard

Admin can:

- View All Registered Users
- View All Tasks
- Monitor Total Users
- Monitor Total Tasks
- Manage Application Data

---

## REST APIs

### Authentication

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`

### Users

- GET `/api/v1/users/me`
- GET `/api/v1/users/` (Admin Only)

### Tasks

- POST `/api/v1/tasks/`
- GET `/api/v1/tasks/`
- PUT `/api/v1/tasks/{id}`
- DELETE `/api/v1/tasks/{id}`
- GET `/api/v1/tasks/all` (Admin Only)

---

# Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Passlib (bcrypt)
- Pydantic

---

## Frontend

- React
- Vite
- Axios
- Tailwind CSS
- React Router

---

# Project Structure

```
FlowCore
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── database
│   │   ├── dependencies
│   │   ├── middleware
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/FlowCore.git
```

```bash
cd FlowCore
```

---

# Backend Setup

Navigate to backend

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/flowcore

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install Dependencies

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

Postman Collection

```
FlowCore.postman_collection.json
```

---

# Database

Database Used

- PostgreSQL

ORM

- SQLAlchemy

Tables

- Users
- Tasks

Relationship

```
One User
      │
      │
      ▼
Multiple Tasks
```

---

# Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Role-Based Authorization
- Request Validation using Pydantic
- Global Exception Handling
- Secure Password Storage

---

# Scalability

FlowCore follows a modular architecture and can be extended easily with:

- Redis Caching
- Docker Deployment
- Background Workers (Celery/RQ)
- Microservices Architecture
- API Gateway
- Load Balancing
- CI/CD Pipeline

---

# Admin Test Account

Email

```
vijaykumar006205@gmail.com
```

Password

```
<your-admin-password>
```

> For public repositories, avoid committing real credentials. Use your local admin account or create a fresh one after setup.

---

# Future Improvements

- Task Categories
- Task Priority
- Search & Filtering
- Due Dates
- Email Notifications
- File Attachments
- User Profile Management
- Dark Mode

---

# Author

**Vijay Kumar**

Backend Developer | Python | FastAPI | React | PostgreSQL

---

# License

This project was developed as part of the **Primetrade.ai Backend Developer Internship Assignment**.