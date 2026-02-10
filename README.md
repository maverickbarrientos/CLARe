# CLARe – CITE Laboratory Reservation System

## Overview

**CLARe (CITE Laboratory Reservation System)** is a smart laboratory reservation and monitoring system designed to digitize and manage computer laboratory usage within the College of Information Technology and Engineering (CITE).

The system replaces manual reservation processes by allowing users to request laboratory reservations online, while administrators manage approvals, scheduling, and laboratory usage monitoring. Approved reservations generate a unique QR code that is scanned before laboratory usage to update the lab status in real time.

CLARe improves efficiency, prevents scheduling conflicts, and provides usage analytics for better laboratory management.

---

## Problem Statement

The current computer laboratory reservation process is manual, which leads to:

- Difficulty in identifying available laboratories
- Scheduling conflicts
- Lack of real-time monitoring
- No centralized usage records
- Inefficient administrative management

CLARe addresses these problems by introducing an automated and monitored reservation workflow.

---

## Objectives

- Digitize the computer laboratory reservation process
- Provide real-time laboratory availability status
- Prevent reservation conflicts
- Track laboratory usage through logs and analytics
- Improve administrative control and monitoring

---

## System Features

### User Features
- Login using PHINMAED account
- Submit laboratory reservation requests
- Receive QR code upon approval
- Scan QR code to mark laboratory as **In Use**
- View reservation status and history

### Admin Features
- Manage users (CRUD)
- Manage computer laboratories (CRUD)
- Approve or decline reservations
- Invalidate QR codes
- View usage logs and analytics
- Edit reservation status when necessary

### System Features
- QR-based laboratory validation
- Reservation conflict detection
- Automatic cancellation if QR is not scanned within allowed time
- Real-time laboratory status:
  - Pending
  - Reserved
  - In Use
  - Cancelled
  - Completed
- Usage logging with decline reasons

---

## System Workflow

1. User logs in using PHINMAED account.
2. User submits a laboratory reservation request.
3. Admin reviews and approves or declines the request.
4. If approved, the system generates a unique QR code.
5. User scans the QR code at the admin office before using the lab.
6. System updates status from **Reserved** to **In Use**.
7. Reservation is logged and completed after usage.

---

## Technology Stack

### Backend
- FastAPI (Python)
- MySQL
- SQLAlchemy ORM
- JWT Authentication

### Frontend
- ReactJS (Admin Dashboard)
- React Native (User Mobile Application)

### Hardware Integration
- ESP32
- UART QR Code Scanner

---

## Project Structure

```
CLARe/
├── backend/
├── frontend/
│   ├── admin-web/
│   └── user-mobile/
├── hardware/
│   └── esp32-qr-scanner/
├── docs/
└── README.md
```

---

## Database Architecture

Main entities:

- Users
- User Information
- Computer Labs
- Reservations
- QR Codes

Relationships:
- One user can have multiple reservations.
- Each reservation belongs to one laboratory.
- Each reservation generates one QR code.
- QR codes can be validated or invalidated by admin.

---

## Future Improvements

- Automated lab occupancy detection
- Notification system for reservation updates
- Advanced analytics dashboard
- Faculty reservation support
- Multi-department laboratory management

---

## Developed For

College of Information Technology and Engineering (CITE)
