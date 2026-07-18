# AI Interview Simulator

AI Interview Simulator is a full-stack AI-powered web application that helps users prepare for technical interviews. It analyzes uploaded resumes, generates personalized interview questions using Google Gemini AI, evaluates spoken responses, provides detailed performance feedback, and allows users to download a professional interview report.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Express-green)
![FastAPI](https://img.shields.io/badge/AI-FastAPI-teal)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-red)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

# Demo

Live Demo: Coming Soon

Demo Video: Coming Soon

---

# Features

- Secure User Signup & Login
- JWT Authentication
- Resume Upload (PDF)
- Resume Parsing
- AI-based Interview Question Generation
- Speech-to-Text Interview
- Timer-based Interview Session
- AI-powered Answer Evaluation
- Interactive Performance Dashboard
- Download PDF Report
- MongoDB Atlas Database
- Responsive User Interface
---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- react-speech-recognition
- Chart.js
- jsPDF
- jspdf-autotable

## Backend

- Node.js
- Express.js
- Multer
- Axios

## AI Service

- FastAPI
- Google Gemini API
- pdfplumber

## Database

- MongoDB Atlas

## Authentication

- JWT (JSON Web Token)

---

# Folder Structure

```
AI-Interview-Simulator
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── ai-service
│   ├── database.py
│   ├── evaluator.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── .gitignore
└── README.md
```

---

# Project Workflow

1. User signs up or logs in.
2. JWT token is generated.
3. User uploads a resume.
4. Resume is parsed using FastAPI.
5. Gemini generates interview questions.
6. User answers using Speech-to-Text.
7. Gemini evaluates responses.
8. Results are displayed.
9. PDF report can be downloaded.
10. Interview history is stored in MongoDB Atlas.

# API Endpoints

### Express Backend

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/upload/resume | Upload resume |

### FastAPI AI Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /parse-resume | Parse resume |
| POST | /generate-questions | Generate interview questions |
| POST | /evaluate-answer | Evaluate interview answers |

# System Architecture

```text
                 +----------------------+
                 |   React Frontend     |
                 | (Vite + Tailwind CSS)|
                 +----------+-----------+
                            |
                            | HTTP Requests
                            |
                            ▼
                 +----------------------+
                 |  Express Backend     |
                 | JWT Authentication   |
                 | Resume Upload (PDF)  |
                 +----------+-----------+
                            |
              +-------------+-------------+
              |                           |
              ▼                           ▼
     +------------------+       +------------------+
     | FastAPI AI       |       | MongoDB Atlas    |
     | Resume Parsing   |       | Users            |
     | Gemini AI        |       | Interviews       |
     | Evaluation       |       +------------------+
     +--------+---------+
              |
              ▼
     +------------------+
     | Google Gemini AI |
     +------------------+
```

# Prerequisites

Before running this project, make sure you have installed:

- Node.js (v18 or later)
- Python (v3.11 or later)
- MongoDB Atlas Account
- Google Gemini API Key
- Git

# Installation

## Clone Repository

```bash
git clone https://github.com/shrisanjanaa-0709/AI-Interview-Simulator.git
```
Install dependencies for all three modules separately.

```
Frontend → npm install

Backend → npm install

AI Service → pip install -r requirements.txt
```
---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## AI Service

```bash
cd ai-service

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

# Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

JWT_ALGORITHM=HS256

JWT_EXPIRE_DAYS=7

FASTAPI_URL=http://localhost:8000
```

---

## AI Service (.env)

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

JWT_SECRET=YOUR_SECRET

JWT_ALGORITHM=HS256

MONGODB_URI=YOUR_MONGODB_URI
```

---

# Screenshots

## Home

(Add Screenshot Here)

---

## Signup

(Add Screenshot Here)

---

## Login

(Add Screenshot Here)

---

## Resume Upload

(Add Screenshot Here)

---

## Interview

(Add Screenshot Here)

---

## Results

(Add Screenshot Here)

---

## PDF Report

(Add Screenshot Here)

---

# Future Improvements

- AI Voice Interview
- Webcam Proctoring
- Coding Round
- HR Interview Round
- Company-specific Interview Sets
- Interview History Dashboard
- Leaderboard
- Dark Mode
- Multi-language Support
- Resume Skill Gap Analysis
- Interview Analytics Dashboard

---

# Author

**Shri Sanjanaa M**

B.E. Computer Science and Engineering

Kumaraguru College of Technology

Passionate about Full Stack Development, AI, and Software Engineering.

GitHub: [shrisanjanaa-0709](https://github.com/shrisanjanaa-0709)

LinkedIn: [Shri Sanjanaa M](https://www.linkedin.com/in/shri-sanjanaa-961580361/)
---

# License

This project is developed for learning and placement purposes.