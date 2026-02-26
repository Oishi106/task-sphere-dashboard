# 🧩 TaskSphere Dashboard

A modern single-page React dashboard application featuring secure authentication and dynamic task management. Built as a frontend-focused project integrating a REST API with a clean and responsive UI.

## 🌐 Live Site
https://your-deployment-link.vercel.app/

## 🖼️ Project Overview

TaskSphere Dashboard is a React-based frontend application that includes a secure login system and a protected dashboard page. The application interacts with a REST API for authentication and data fetching.

After successful login, users can access a private dashboard where task-related data is displayed dynamically. The UI is designed to closely match the provided dashboard design and ensures responsiveness across all devices.

## 🚀 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Axios / Fetch API
- Tailwind CSS
- Context API / Local Storage (Authentication Handling)

### Backend (Provided REST API)

- Authentication Endpoint
- Task Data API
- JWT Token-Based Login

---

## ⭐ Main Features

- 🔐 Secure Login System (JWT Token-based Authentication)
- 🔒 Private Route Protection (Dashboard accessible only after login)
- 💾 Persistent Authentication (No logout on page refresh)
- 📊 Dynamic Dashboard Data from REST API
- 🎨 Clean UI based on provided design
- 📱 Fully Responsive (Mobile, Tablet, Desktop)
- ⏳ Loading & Error Handling
- ❌ 404 Not Found Page
- ✨ Smooth UI Transitions & Modern Aesthetics

---

## 🔑 Authentication Flow

- User submits email & password
- POST request sent to `/api/login`
- JWT token received from API
- Token stored in localStorage
- Protected routes validated using token
- Redirect to Dashboard upon success

---

## 📦 Dependencies

### Client

- react
- react-router-dom
- axios
- tailwindcss
- react-icons

---

## 🛠 Installation & Setup

```bash
git clone https://github.com/your-username/task-sphere-dashboard.git
cd task-sphere-dashboard
npm install
npm run dev
```

---

## 📌 Environment Variables

Create a `.env` file in the root:

```
VITE_API_BASE_URL=https://task-api-eight-flax.vercel.app
```

---

## 📤 Deployment

This project is deployed using:

- Vercel / Netlify

---

## 👨‍💻 Author

Mahmuda Afroz Oishi  
Frontend Developer | React Enthusiast
