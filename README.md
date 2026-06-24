# Job & Internship Application System

A full-stack web application that allows users to browse job opportunities, apply for jobs, and track application status, while administrators can manage job postings and application reviews.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (User/Admin)

### User Features

* Browse Available Jobs
* View Job Details
* Apply for Jobs
* Track Application Status
* View Personal Applications Dashboard

### Admin Features

* Create Job Listings
* Update Job Listings
* Delete Job Listings
* View All Applications
* Update Application Status

### Application Statuses

* Applied
* Shortlisted
* Selected
* Rejected

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Context API
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

---

## Project Structure

### Frontend

```text
src/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

### Backend

```text
src/
├── config/
├── middleware/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── job/
│   └── application/
├── utils/
└── app.js
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Jobs

```http
GET    /api/jobs
GET    /api/jobs/:id

POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```http
POST   /api/applications
GET    /api/applications/me

GET    /api/applications
PUT    /api/applications/:id/status
```

---

## Screenshots

### Home Page

<img width="940" height="907" alt="Screenshot 2026-06-24 103456" src="https://github.com/user-attachments/assets/033bba9c-0d20-4e4d-b090-cf02410699d5" />


### Login Page

<img width="957" height="906" alt="Screenshot 2026-06-24 103512" src="https://github.com/user-attachments/assets/2a2a3d7a-b724-4bad-990d-42e808ae3afc" />


### Jobs Page

<img width="958" height="906" alt="Screenshot 2026-06-24 103551" src="https://github.com/user-attachments/assets/5d872d57-6fbc-44d7-b017-737edc0d232b" />


### User Dashboard

<img width="960" height="912" alt="Screenshot 2026-06-24 103606" src="https://github.com/user-attachments/assets/99a77812-6aff-45d1-9309-13c8064178c3" />


### Admin Panel

<img width="941" height="912" alt="Screenshot 2026-06-24 103635" src="https://github.com/user-attachments/assets/35a4c081-a177-4280-a6a8-c51dd88e2e7d" />


### Application Management

<img width="941" height="837" alt="Screenshot 2026-06-24 103647" src="https://github.com/user-attachments/assets/f9c7f16e-60e4-4922-b1ec-ddbf770424d4" />

---

## Installation

### Backend

```bash
git clone <repository-url>

cd backend

npm install

npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Test Credentials

### Admin

Create a user account and update the role in MongoDB Atlas:

```json
{
  "role": "admin"
}
```

### User

Register normally through the application.

---

## Future Improvements

* Resume File Upload
* Email Notifications
* Search & Filtering
* Pagination
* Company Profiles
* Saved Jobs

---

## Author

**Deepanshu Yadav**

Full Stack Development Internship Project
