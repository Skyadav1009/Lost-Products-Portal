# Lost Products Portal

A full-stack web application that helps users report and discover lost and found items. Users can create an account, post items they've lost or found, and browse community reports to reunite owners with their belongings.

## Features

- **User Authentication** – Register and log in securely using JWT-based authentication.
- **Report Lost Items** – Describe an item you've lost, including title, description, location, and date.
- **Report Found Items** – Post details about an item you've found so the owner can reclaim it.
- **Browse Listings** – View all lost and found item reports posted by the community.
- **Item Details** – See full details of any reported item.
- **Personal Dashboard** – Manage the lost and found items you've reported.
- **Delete Reports** – Remove your own lost or found item reports.

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| cors | Cross-origin resource sharing |
| morgan | HTTP request logging |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS | Utility-first styling |

## Project Structure

```
Lost-Products-Portal/
├── backend/
│   ├── config/         # Database connection
│   ├── context/        # Shared context/utilities
│   ├── controllers/    # Route handler logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose data models
│   ├── routes/         # Express route definitions
│   ├── utils/          # Helper utilities
│   └── server.js       # Entry point
└── frontend/
    ├── public/         # Static assets
    └── src/
        ├── api/        # Axios API calls
        ├── assets/     # Images and static files
        ├── components/ # Reusable React components
        ├── context/    # React context (auth state, etc.)
        ├── pages/      # Page-level components
        ├── utils/      # Frontend helper utilities
        └── main.jsx    # App entry point
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/Skyadav1009/Lost-Products-Portal.git
cd Lost-Products-Portal
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
node server.js
```

The API will be available at `http://localhost:5000`.

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

### Auth – `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/signup` | Public | Register a new user |
| POST | `/login` | Public | Log in and receive a JWT |
| GET | `/me` | Private | Get the logged-in user's profile |

### Lost Items – `/api/lost`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all lost item reports |
| GET | `/my-items` | Private | List the current user's lost items |
| POST | `/` | Private | Create a new lost item report |
| DELETE | `/:id` | Private | Delete your own lost item report |

### Found Items – `/api/found`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all found item reports |
| GET | `/my-items` | Private | List the current user's found items |
| POST | `/` | Private | Create a new found item report |
| DELETE | `/:id` | Private | Delete your own found item report |

