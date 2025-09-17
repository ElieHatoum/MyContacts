# MyContacts

MyContacts is a fullstack web application. It provides a secure authentication system and a user-friendly interface to manage personal contacts. The project demonstrates a complete end-to-end stack (React + Vite frontend, Node.js + Express backend, MongoDB database).

## Table of Contents

-   [Structure](#structure)
-   [Getting Started](#getting-started)
-   [Backend](#backend-server)
-   [Frontend](#frontend-client)
-   [Scripts](#scripts)
-   [Endpoints](#endpoints)
-   [Usage](#usage)

## Structure

```
/
├── client   # Frontend (React + Vite)
└── server   # Backend (Node.js + Express)
```

## Getting Started

### Prerequisites

-   Node.js
-   npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ElieHatoum/MyContacts.git
    cd MyContacts
    ```

## Backend (`server`)

### Installation

1. Install dependencies:

    ```bash
    cd server
    npm install
    ```

2. Environment Configuration for the server:

    ```bash
    touch .env
    ```

3. Database Setup:

    ```bash
    https://www.mongodb.com/products/platform/atlas-database
    ```

4. Update the `.env` file with your configuration:

    ```env
    MONGODB_URI=your_database_url
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

5. Run tests:

    First, install Jest if you haven't already:

    ```bash
    npm install --save-dev jest
    ```

    Then run the tests:

    ```bash
    npm test
    ```

6. Start the server:
    ```bash
    node server.js
    ```

## Frontend (`client`)

### Installation

1. Install dependencies:

    ```bash
    cd client
    npm install
    ```

2. Start the app:

    ```bash
    npm run dev
    ```

## Scripts

### Development Scripts

| Script            | Command         | Description                                                |
| ----------------- | --------------- | ---------------------------------------------------------- |
| Start Development | `npm run dev`   | Starts the application in development mode with hot reload |
| Build             | `npm run build` | Builds the application for production                      |
| Test              | `npm test`      | Runs the test suite                                        |

## Endpoints

### Authentication Endpoints

| Method | Endpoint             | Description         | Auth Required |
| ------ | -------------------- | ------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user | No            |
| POST   | `/api/auth/login`    | User login          | No            |

### Data Endpoints

| Method | Endpoint            | Description              | Auth Required |
| ------ | ------------------- | ------------------------ | ------------- |
| GET    | `/api/contacts`     | Get all contact entries  | Yes           |
| POST   | `/api/contacts`     | Create new contact entry | Yes           |
| PATCH  | `/api/contacts/:id` | Update contact entry     | Yes           |
| DELETE | `/api/contacts/:id` | Delete contact entry     | Yes           |

### Example Request/Response

#### POST `/api/auth/login`

**Request:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Test Credentials (Identifiants Test)

### Test Credentials

-   Email: `user@example.com`
-   Password: `StrongPassword123!`

### Testing URLs

-   **Local Development (server):** `http://localhost:3000`
-   **API Base URL:** `https://mycontacts-ojpo.onrender.com`
-   **API Documentation:** `https://mycontacts-ojpo.onrender.com/api-docs/`

## Usage

### Quick Start Example

1. Register a new user:

    ```bash
    curl -X POST http://localhost:3000/api/auth/register \
      -H "Content-Type: application/json" \
      -d '{"email":"newuser@test.com","password":"password123"}'
    ```

2. Login to get a token:

    ```bash
    curl -X POST http://localhost:3000/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"newuser@test.com","password":"password123"}'
    ```

3. Use the token to access protected endpoints:
    ```bash
    curl -X GET http://localhost:3000/api/contacts \
      -H "Authorization: Bearer YOUR_TOKEN_HERE"
    ```
