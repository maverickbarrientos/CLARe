# CLARe Backend API

## Overview

The CLARe Backend is the core service responsible for handling authentication, laboratory reservations, QR code generation and validation, and system data management for the **CITE Laboratory Reservation System (CLARe)**.

This backend provides RESTful APIs used by both the Admin Web Application (ReactJS) and the User Mobile Application (React Native), as well as hardware integration for QR code validation.

---

## Responsibilities

The backend is responsible for:

- User authentication and authorization
- Laboratory reservation management
- QR code generation and validation
- Reservation approval workflow
- Real-time laboratory status updates
- Usage logging and analytics
- Conflict detection for reservations
- Admin management operations

---

## Technology Stack

- **FastAPI**
- **Python**
- **MySQL**
- **SQLAlchemy ORM**
- **JWT Authentication**
- **Pydantic Validation**

## 🚀 Features

### User API
- PHINMAED account login via JWT
- Submit lab reservation requests
- View reservation history

### Admin API
- CRUD Users
- CRUD Computer Labs
- Approve/Decline Reservations
- Invalidate QR Codes
- View usage logs and analytics

### System Logic
- QR code generation and validation
- Reservation status transitions:
  - `pending → reserved → in_use → completed`
  - Auto-cancel if not scanned within allowed time
- Conflict detection
- Real-time lab availability

---

## Reservation Status Flow

```
Pending → Reserved → In Use → Completed
           ↓
        Cancelled
```

- Reservations remain **Reserved** until QR code is scanned.
- If QR is not scanned within the allowed time window, the reservation is automatically cancelled.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /auth/login | User login |
| POST   | /users | Create user |
| GET    | /computer_labs | List labs |
| POST   | /reservations | Create reservation |
| POST   | /qr/validate | Validate QR code |
| GET    | /analytics/usage | Usage logs & analytics |


## Running the Backend Locally

### 1. Create Virtual Environment
```
python -m venv venv
```

### 2. Activate Environment
```
venv\Scripts\activate
```

### 3. Install Dependencies
```
pip install -r requirements.txt
```

### 4. Run FastAPI Server
```
uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

API documentation available at:

```
http://127.0.0.1:8000/docs
```

---

## Future Improvements

- WebSocket support for real-time lab updates
- Notification service
- Advanced analytics reporting
- Automated reservation reminders

---

## CLARe System

Part of the **CLARe – CITE Laboratory Reservation System** developed for the College of Information Technology and Engineering (CITE).
