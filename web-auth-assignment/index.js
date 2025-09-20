//Server Setup
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// In-memory "database"
const users = [];

// Secret for JWT
const JWT_SECRET = "mysecretkey";

//Registering a user with hashed password
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
  res.json({ message: "User registered successfully!" });
});

//Login with password verification
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

  res.json({ message: "Login successful!" });
});

//Adding JWT token generation after successful login
app.post("/login-jwt", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: "Invalid password" });

  // Generate JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful!", token });
});

//Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected route
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is your dashboard!` });
});

//Server Start
app.get("/", (req, res) => {
  res.send("Server is running! Use /register, /login, /login-jwt, or /dashboard.");
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
