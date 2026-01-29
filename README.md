# InterviewPrep
A web app that helps job-seekers create, schedule, and practice mock interviews. Features include user authentication, personal question bank, schedule mock interviews (with timers & scoring), analytics on performance (accuracy, average time), and sharing interview sessions with peers. Includes an admin view to manage question categories and view app metrics.

Why this is resume-worthy:

Full-stack app (Spring Boot REST API + React SPA) demonstrating backend, frontend, DB, auth, and deployment.

Real-world features: auth, scheduling, analytics, role-based access.

Extensible: you can add more (video, calendar sync, AI) later.

Shows ability to work with modern tooling (Docker, CI, React, Spring Boot).

# Tech stack

Backend: Java 17+, Spring Boot 3.x (Spring Web, Spring Security (JWT), Spring Data JPA, Lombok, MapStruct optional)

Database: MySQL (or MariaDB). We'll provide Docker Compose.

Frontend: React (Vite or Create React App) + React Router + Axios + Tailwind CSS (or Material UI)

Tooling: Maven or Gradle (I’ll pick Maven unless you prefer Gradle), Node 18+, VS Code

Dev/Deployment: Docker & docker-compose for local dev, optional deployment to Heroku/GCP/AWS later

# High-level features

User registration & login (JWT-based)

User profiles (skills, experience level)

Question Bank (CRUD) with categories (behavioral, system design, algorithms)

Mock Interview Creator — combine questions into a session, set per-question timer

Conduct session UI — timer, submit answer text, score, comments

Session analytics — per-user and per-question stats (average time, correctness)

Share session link (read-only) and invite others

Admin panel — manage categories, moderate questions, view basic metrics

Dockerized services and scripts to initialize DB

# Database schema (core tables)

users

id (PK), username (unique), email (unique), password_hash, full_name, role (USER/ADMIN), created_at, updated_at

profiles

id (PK), user_id (FK users.id), experience_level, skills (text/json), bio

categories

id, name, description

questions

id, title, body, difficulty (enum), category_id (FK), created_by (FK users.id), created_at

interviews

id, owner_id (FK users.id), title, description, duration_minutes, created_at

interview_questions

id, interview_id (FK), question_id (FK), order_index, time_limit_seconds

sessions

id, interview_id (FK), host_user_id, started_at, finished_at, public_link (nullable)

session_responses

id, session_id (FK), question_id (FK), respondent_user_id, answer_text, score (int), time_taken_seconds, created_at

audit/logs (optional) — for admin metrics

# REST API

POST /api/auth/register — register

POST /api/auth/login — login -> returns JWT

GET /api/users/me — profile

PUT /api/users/me — update profile

GET /api/categories — list

POST /api/categories — admin

GET /api/questions — list / filters

POST /api/questions — create question

GET /api/interviews — list user interviews

POST /api/interviews — create interview

GET /api/interviews/{id} — interview detail (with questions)

POST /api/sessions/{interviewId}/start — start session

POST /api/sessions/{sessionId}/responses — submit answer

GET /api/sessions/{sessionId}/analytics — session analytics

# Frontend pages & components

Pages:

Login / Register

Dashboard (my interviews, quick stats)

Question Bank (list, filter by category/difficulty)

Create/Edit Interview

Conduct Interview (timer, question viewer, submit)

Session Result / Analytics

Admin Panel

Key components:

Auth forms (LoginForm, RegisterForm)

ProtectedRoute (JWT)

InterviewBuilder (drag/drop question ordering optional)

Timer component

Analytics charts (use recharts)

API client (Axios instance that injects JWT)

# Project structure

Backend (springboot):

/backend
  /src/main/java/com/interviewprep
    /config
    /controller
    /dto
    /entity
    /repository
    /security
    /service
  pom.xml
  application.yml


Frontend (react):

/frontend
  /src
    /api
    /components
    /pages
    /routes
    /styles
  package.json
  vite.config.js (or CRA setup)

Root:

docker-compose.yml
README.md

# Development environment setup (for VS Code)

Install JDK 17+

Install Maven

Install Node 18+

Install VS Code extensions: Java Extension Pack, Spring Boot Extension Pack, ESLint, Prettier, Tailwind CSS IntelliSense (if used)

MySQL: use Docker Compose provided or local MySQL instance

Generate Spring Boot project (Maven) with dependencies: Spring Web, Spring Data JPA, MySQL Driver, Spring Security, Lombok, Validation.
