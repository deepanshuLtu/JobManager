# E-Learning Platform

A full-stack E-Learning Platform built as part of a Full Stack Development Internship Program. The application allows users to browse courses, enroll in them, and track their learning progress, while administrators can manage course offerings through an admin dashboard.

---

## Features

### User Features

* User Registration
* User Login with JWT Authentication
* Browse Available Courses
* Enroll in Courses
* View Enrolled Courses
* Track Course Progress
* Personalized Dashboard

### Admin Features

* Create New Courses
* View All Courses
* Delete Existing Courses
* Manage Course Catalog

### General Features

* JWT-Based Authentication
* Protected Routes
* Role-Based Access Control
* Responsive User Interface
* MongoDB Atlas Integration

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── context/

backend/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── course/
│   │   └── enrollment/
│   └── utils/
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

The backend requires the following environment variables:

```env
PORT
MONGODB_URI
JWT_SECRET
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Courses

```http
GET /api/courses
POST /api/courses
DELETE /api/courses/:id
```

### Enrollments

```http
POST /api/enrollments/:courseId
GET /api/enrollments/my
```

---

## Screenshots

### Home Page

<img width="1918" height="1078" alt="Screenshot 2026-06-20 222913" src="https://github.com/user-attachments/assets/72e64248-83f0-49a3-975d-ae0d985ec55d" />


### Courses Page

<img width="1918" height="1077" alt="Screenshot 2026-06-20 223033" src="https://github.com/user-attachments/assets/5e30ad13-ecfc-420e-8bed-2d74fe9e7c34" />


### Dashboard

<img width="1918" height="1075" alt="Screenshot 2026-06-20 223038" src="https://github.com/user-attachments/assets/70f1f89e-cc32-45a9-a953-431f8cc08238" />

### Admin Panel

<img width="1918" height="1077" alt="Screenshot 2026-06-20 223119" src="https://github.com/user-attachments/assets/d19f6b5b-3c09-46b4-b221-53c2210dd63b" />

---

## Future Enhancements

* Course Video Lessons
* Course Completion Certificates
* Payment Gateway Integration
* Search and Filter Functionality
* Course Reviews and Ratings
* Instructor Dashboard
* Progress Analytics
* Email Notifications

---

## Author

**Deepanshu Yadav**

# JobManager
