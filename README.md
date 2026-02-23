# Clinic Center API - Documentation

Welcome to the **Clinic OPD Management System** backend documentation. This project is built with Node.js, Express, Prisma (PostgreSQL), and TypeScript.

## Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL Database

### Installation
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure your `.env` file with `DATABASE_URL` and `JWT_SECRET`.
4. Run migrations: `npx prisma migrate dev`
5. Seed initial data: `npm run seed`
6. Start development server: `npm run dev`

---

## Authentication Flow

The system uses JWT (JSON Web Tokens) for secure access.

1. **Login**: Admin sends email/password to `/auth/login`.
2. **Token**: On success, the server returns a JWT token.
3. **Protected Access**: For all other routes, the client must include the token in the headers as:
   `Authorization: Bearer <your-token>`

---

##  System Flow & Relations

The project manages clinical operations through these core entities:

### 1. Departments & Doctors
- **Departments** are the high-level categories (e.g., Cardiology, Dental).
- **Doctors** belong to a specific Department.
- A **Doctor** can have multiple **Schedules** defining their availability (Day of Week, Time, Room).

### 2. OPD Management
- **OPD Sheets** are created daily (dated in Nepali BS calendar).
- **OPD Entries** are the actual patient registrations linked to a specific **OPD Sheet**.
- Each **OPD Entry** is assigned to a **Doctor** from the department.

---

##  API Routes Detail

### 1. Authentication (`/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/login` | Admin login with email/password. Returns JWT. |
| POST | `/logout` | Logout (Protected). |

### 2. Departments (`/departments`) - *Protected*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/` | List all departments. |
| POST | `/` | Create a new department. |
| PATCH | `/:id` | Update department details. |
| DELETE | `/:id` | Soft delete a department. |

### 3. Doctors (`/doctors`) - *Protected*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/` | List all doctors. |
| GET | `/availability` | Check doctor availability (Query: `?day=MON`). |
| POST | `/` | Add a new doctor. |
| GET | `/:id` | Get detailed profile of a specific doctor. |
| PATCH | `/:id` | Update doctor info. |
| DELETE | `/:id` | Remove a doctor. |
| POST | `/:id/schedules` | Create a new schedule for a doctor. |
| GET | `/:id/schedules` | List all schedules for a doctor. |

### 4. Doctor Schedules (`/doctor-schedules`) - *Protected*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| PATCH | `/:scheduleId` | Update a specific schedule. |
| DELETE | `/:scheduleId` | Delete a schedule. |

### 5. OPD Sheets (`/opd-sheets`) - *Protected*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/` | List sheets (Support filters: `startDate`, `endDate`, `month`). |
| POST | `/` | Create a new OPD sheet for a date. |
| GET | `/:id` | Get sheet details along with all its patient entries. |
| PATCH | `/:id` | Update sheet notes or details. |
| DELETE | `/:id` | Delete an OPD sheet. |
| POST | `/:id/entries` | Register a patient (Create OPD Entry) for this sheet. |
| GET | `/:id/entries` | Filter/Search patient entries within this sheet. |

### 6. OPD Entries (`/opd-entries`) - *Protected*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/:entryId` | Get specific patient registration details. |
| PATCH | `/:entryId` | Update patient info, treatment, or payment status. |
| DELETE | `/:entryId` | Delete a registration entry. |

---


