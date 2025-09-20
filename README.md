# Web Authentication Assignment

This project demonstrates **user authentication** using **Node.js, Express, bcrypt, and JWT**.  
It includes password hashing, login validation, and token-based authentication for secure access.  

---

## 🚀 Features
- 🔒 User registration with **hashed passwords** (bcrypt)
- 🔑 User login with password verification
- 🛡️ JWT-based authentication for protected routes
- 🎓 Real-life scenario: **Student/User Portal** with a protected dashboard

---

## 📂 Project Structure
```

index.js       # Main server file
package.json   # Project dependencies

````

---

## ⚙️ Installation & Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/stephensarkar/Assignment_Auth.git
   cd web-auth-assignment


2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

Server runs on:
👉 `http://localhost:3000`

---

## 🛠️ API Endpoints

### 1. Register User

**POST** `/register`  
Request Body:

```json
{
  "username": "stephen",
  "password": "mypassword"
}
```

Response:

```json
{
  "message": "User registered successfully!"
}
```

---

### 2. Login (without JWT)

**POST** `/login`  
Request Body:

```json
{
  "username": "stephen",
  "password": "mypassword"
}
```

Response:

```json
{
  "message": "Login successful!"
}
```

---

### 3. Login (with JWT)

**POST** `/login-jwt`  
Request Body:

```json
{
  "username": "stephen",
  "password": "mypassword"
}
```

Response:

```json
{
  "message": "Login successful!",
  "token": "<your_jwt_token>"
}
```

---

### 4. Access Dashboard (Protected)

**GET** `/dashboard`  
Headers:

```
Authorization: Bearer <your_jwt_token>
```

Response:

```json
{
  "message": "Welcome stephen, this is your dashboard!"
}
```

---

## 📝 Notes

* Passwords are hashed using **bcrypt** before storing.
* JWT tokens are generated with a secret key (`mysecretkey`) and expire in **1 hour**.
* In-memory storage is used for simplicity (no database).

---

## 📌 Submission Info

* Assignment: Node.js Hashing & JWT Authentication
* Tech Stack: Node.js, Express, bcrypt, JWT
* Author: Stephen Sarkar
