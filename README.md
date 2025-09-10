# 🎓 AcademiQ  
> A modern academic management platform for students, teachers & administrators 🚀  

![AcademiQ Banner](https://img.shields.io/badge/AcademiQ-College%20Management-blueviolet?style=for-the-badge)  

[![Build](https://img.shields.io/github/actions/workflow/status/Rj979/AcademiQ/maven.yml?style=flat-square)](https://github.com/Rj979/AcademiQ/actions)  
![License](https://img.shields.io/github/license/Rj979/AcademiQ?style=flat-square)  
![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)  
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen?style=flat-square&logo=springboot)  
![MariaDB](https://img.shields.io/badge/MariaDB-Latest-blue?style=flat-square&logo=mariadb)  
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)  

---

## 📖 About  

**AcademiQ** is a full-stack **college management system** designed to streamline academic operations for institutions:  

- ✅ Manage **student information**, enrollment & profiles  
- ✅ Organize **courses, subjects & department timetables**  
- ✅ Handle **marks, grades & paper submissions**  
- ✅ Manage **teachers, staff roles & permissions**  
- ✅ Secure authentication & authorization using **JWT**  
- ✅ Expose **REST APIs** for frontend integration  

---

## ✨ Features  

- 🔐 **Secure Login** with JWT & role-based access  
- 🎓 **Student Enrollment** & course assignment  
- 📚 **Subject, Paper & Marks Management**  
- 🧑‍🏫 **Teacher & Admin Dashboards**  
- 🕒 **Department Timetables & Scheduling**  
- ⚡ **REST API** powered by **Spring Boot**  
- 🐳 **Dockerized** for seamless deployment  

---

## 🛠️ Tech Stack  

- **Backend:** Java 17+, Spring Boot 3.x, Hibernate (JPA)  
- **Database:** MariaDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Deployment:** Docker, Render, or any PaaS  
- **Frontend (planned):** React or Vue.js  

---

## ⚙️ How AcademiQ Works

### 1. **User Authentication & Authorization**
- **Purpose:** Secure the system and ensure only authorized users can access certain data.
- **Mechanism:**
  - Users (Students, Staff, Admins) login with username/password.
  - On successful login, the system generates a **JWT (JSON Web Token)**.
  - This token is sent with every API request to verify identity and role.
- **Roles & Permissions:**
  - `ADMIN` → Full access  
  - `STAFF` → Manage courses, enter marks  
  - `STUDENT` → View own profile & grades  

### 2. **Student & Staff Management**
- **Purpose:** Maintain detailed records for all users.
- **Mechanism:**
  - Admins can create, update, or delete users.
  - Profiles stored in **MariaDB** via **JPA/Hibernate**.

### 3. **Course & Enrollment Management**
- **Purpose:** Handle course creation, student enrollment, and assignments.
- **Mechanism:**
  - Courses assigned to staff. Students can enroll in multiple courses.
  - Many-to-many relationships managed through **Enrollment** table.

### 4. **Marks & Papers Management**
- **Purpose:** Track student performance.
- **Mechanism:**
  - Teachers enter marks via API or admin interface.
  - Marks stored in database linked to student and course entities.

### 5. **RESTful API Layer**
- **Controllers:** Handle HTTP requests.  
- **Services:** Implement business logic.  
- **Repositories:** Handle database operations via JPA.  
- **Security:** Sensitive endpoints protected by JWT & role checks.

### 6. **Database Architecture**
- **Entities:** Users, Students, Staff, Courses, Enrollments, Marks.  
- **Relationships:** Staff → Courses (One-to-Many), Students ↔ Courses (Many-to-Many).  
- **Persistence:** Managed via Hibernate/JPA.

### 7. **Security & Configuration**
- JWT Tokens for stateless authentication.  
- CORS configured for frontend access.  
- Environment variables store sensitive info.

### 8. **Deployment & Scaling**
- Dockerized for easy deployment.  
- Compatible with cloud platforms and VPS.  
- Can scale horizontally with multiple containers.

### 9. **Data Flow Summary**
1. User sends request → Controller.  
2. Controller validates JWT → checks user role.  
3. Controller calls Service Layer → applies business rules.  
4. Service calls Repository Layer → interacts with MariaDB.  
5. Response returned → Frontend receives JSON data.

---

## 🚀 Getting Started  

### 🔧 Prerequisites  
- Java 17+  
- Maven 3+  
- MariaDB running locally or in Docker  

### 📦 Clone & Build  
```bash
# Clone repository
git clone https://github.com/Rj979/AcademiQ.git
cd AcademiQ/academiq-java-api

# Build JAR
./mvnw clean package -DskipTests

# Run application
./mvnw spring-boot:run
```

### 🐳 Run with Docker  
```bash
# Build Docker image
docker build -t academiq-api .

# Run container
docker run -p 8080:8080 --env-file .env academiq-api
```

---

## 🌐 API Endpoints (Examples)  

- `POST /api/auth/login` → User login & get JWT  
- `POST /api/auth/register` → Register student/staff  
- `GET /api/students` → List all students (admin only)  
- `POST /api/courses` → Add a new course  

*(Full API documentation coming soon)*  

---

## 👨‍💻 Contributing  

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature-x`  
3. Commit changes: `git commit -m "Add feature x"`  
4. Push & create a Pull Request  

---

## 📜 License  
MIT License © 2025 [Rj979](https://github.com/Rj979)  
