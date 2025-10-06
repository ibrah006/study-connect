# 🎓 Study Connect

### A student-first platform that helps university students **find study buddies**, **form groups**, and **discover micro-internships or campus jobs** — all in one place.

---

## 🚀 Overview

**Study Connect** bridges the gap between student life and career growth.  
Freshers and university students often struggle to make friends, form study groups, or find their first campus job — this app makes all of that effortless.

---

## ✨ Features

### 👥 Buddy Finder
- Match with classmates based on **courses**, **interests**, or **hobbies**.  
- View suggested buddies and connect instantly.  
- Option to form or join study groups.

### 💼 Job & Internship Finder
- Browse local campus jobs, micro-internships, and ambassador roles.  
- Job cards with quick details and one-click apply.  
- Each application automatically attaches your profile and resume.

### 📄 Resume Builder
- Auto-generate a clean resume from your profile information.  
- Download as PDF instantly.

### 👤 User Profiles
- Create a verified student profile (name, major, year, interests, skills).  
- Profiles act as your digital resume for job applications and buddy matching.

---

## 🧩 Tech Stack

| Layer | Tech Used |
|-------|------------|
| Frontend | **React + Vite + Tailwind CSS** |
| Backend | **Express.js + TypeORM + Node.js** |
| Database | **PostgreSQL** |
| Authentication | **JWT (JSON Web Tokens)** |
| Resume PDF | **pdfkit / puppeteer (HTML → PDF)** |
| Hosting (suggested) | **Railway.app / Render.com / Vercel (frontend)** |

---

## ⚙️ API Endpoints Overview

### Auth
- `POST /auth/register` – Register new user  
- `POST /auth/login` – Login and get JWT  
- `GET /users/me` – Fetch current profile  

### Buddy Finder
- `GET /buddies/match` – Get suggested matches  
- `POST /buddies/connect/:id` – Send connection request  
- `GET /buddies` – List current buddies  

### Study Groups
- `POST /groups` – Create a new group  
- `GET /groups` – View all groups  
- `POST /groups/:id/join` – Join group  

### Job Board
- `GET /jobs` – View all jobs  
- `GET /jobs/:id` – View job details  
- `POST /jobs` – Create new job posting (admin/employer)  
- `POST /jobs/:id/apply` – Apply for job  

### Resume
- `POST /resume/generate` – Create PDF resume  
- `GET /resume/me` – Download resume  

---

## 🧠 Quick Start (Development)

### 1. Clone the repo
```bash
git clone https://github.com/<yourusername>/study-connect.git
cd study-connect
