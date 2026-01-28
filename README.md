# Mini CRM Backend

A robust backend system for a Mini CRM (Customer Relationship Management) application. Built with **NestJS**, **Prisma ORM**, and **PostgreSQL**, featuring full Role-Based Access Control (RBAC) and Swagger API documentation.

## Live Demo
**API Documentation (Swagger):** [https://mini-crm-api.onrender.com/api](https://mini-crm-api-x5ah.onrender.com/api)

---

## Features

### Authentication & Security
* **JWT Authentication**: Secure user login and registration.
* **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN` and `EMPLOYEE` roles.
* **Password Hashing**: Bcrypt encryption for user security.

### Users Module (Admin Only)
* **View Users**: Admins can view all registered users.
* **Manage Roles**: Admins can promote/demote users (Update Role).

### Customers Module
* **CRUD Operations**: Create, Read, Update, and Delete customers.
* **Search & Pagination**: Filter customers by name/email with pagination support.
* **Permissions**: Admins have full access; Employees have read-only access.

### Tasks Module
* **Task Assignment**: Admins can assign tasks to employees.
* **Workflow**: Employees can update the status of their assigned tasks (`PENDING` -> `IN_PROGRESS` -> `DONE`).
* **Privacy**: Employees only see tasks assigned to them.

---

## Tech Stack
* **Framework**: NestJS (Node.js)
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Documentation**: Swagger (OpenAPI)
* **Containerization**: Docker & Docker Compose
* **Deployment**: Render

---

## Setup Instructions

### 1. Prerequisites
* Node.js (v18+)
* Docker & Docker Compose

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/srv-0/Mini-CRM-Backend
cd mini-crm-backend

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```
# Database Connection (Docker default)
DATABASE_URL="postgresql://admin:securepassword@localhost:5433/mini_crm?schema=public"

# JWT Secrets
JWT_SECRET="secret_key_123"
JWT_EXPIRES_IN="1d"
```

### 4. Database Setup (Docker)
Start the PostgreSQL container:
```
docker-compose up -d
```
Run database migrations to create tables:
```
npx prisma migrate dev --name init
```
### 5. Start the Server
```
# Development Mode
npm run start:dev

# Production Mode
npm run start:prod
```
The server will start on http://localhost:3000.

## API Documentation
Interactive API docs are available via Swagger.

Local: "http://localhost:3000/api"

Production: "https://your-app.onrender.com/api"

## Testing (Curl Examples)
1. Register an Admin
## Description
```
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@test.com","password":"password123","role":"ADMIN"}'
```
2. Login (Get Token)
```
   curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```
Copy the access_token from the response for the next steps.

3. Create a Customer (Admin Only)
```
curl -X POST http://localhost:3000/customers \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Tech Corp","email":"contact@tech.com","phone":"1234567890"}'
```
4. Search Customers
```
curl -X GET "http://localhost:3000/customers?search=Tech&page=1&limit=5" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
5. Assign a Task
```
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Fix Database","customerId":1,"assignedToId":2}'
```
## Project Structure
```

src/
├── auth/          # Login, Register, JWT Strategy, Guards
├── customers/     # Customer CRUD, Search, Pagination
├── tasks/         # Task Management, RBAC Logic
├── users/         # User Management (Admin Only)
├── prisma/        # Database Connection & Schema
├── main.ts        # Entry point (Swagger setup, Validation Pipes)
└── app.module.ts  # Root Module

```
## Docker Deployment
The project includes a `docker-compose.yml` for easy local database setup.

 * Database Port: 5433 (Mapped to internal 5432 to avoid conflicts)

 * User/Pass: admin / securepassword
## Deployment
This project is deployed on Render.

 * Web Service: NestJS Node.js Runtime

 * Database: Render PostgreSQL (Free Tier)
 * 
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Author

Saurav Singh

National Institute of Technology Delhi
