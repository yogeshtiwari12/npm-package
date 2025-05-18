# 🌟 authmate-js 🌟

[![npm version](https://badge.fury.io/js/authmate-js.svg)](https://www.npmjs.com/package/authmate-js)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/yogeshtiwari12/npm-package)


✨ **Secure Authentication Solution for Node.js Applications** ✨  
A comprehensive and secure authentication package with MongoDB, JWT, and bcrypt for Node.js applications. This package helps you implement user authentication quickly and securely, with tokens managed internally (never exposed to clients)! 🚀

---

## 🚀 Installation

Install the package using **npm** or **yarn**:

```bash
npm install authmate-js
# or
yarn add authmate-js
```

## 📋 Prerequisites

- MongoDB connection (local or Atlas)
- Node.js environment
- Set up `.env` file with:
  ```
  JWT_SECRET=your_jwt_secret_here
  MONGO_URI=your_mongodb_connection_string
  ```

## 🌟 Features

- User registration (signup)
- User authentication (login)
- Secure token management (tokens never exposed to clients)
- Password encryption with bcrypt
- User data retrieval
- Logout functionality
- Database connection handling

## 📖 Usage/Examples

### Basic Implementation
```javascript
import { signup, login, getUser, allusers, logout, connectDb } from 'authmate-js';

// First connect to MongoDB
await connectDb();

// Register a new user
const signupResult = await signup('User Name', 'user@example.com', 'password123');
console.log(signupResult);
// { message: "User created successfully", user: { name: "User Name", email: "user@example.com" } }

// Login with credentials
const loginResult = await login('user@example.com', 'password123');
console.log(loginResult);
// { message: "Login successful", token: "jwt_token_here" }

const token = loginResult.token;

// Get user information with token
const userResult = await getUser(token);
console.log(userResult);


// Get all users
const allUsersResult = await allusers();
console.log(allUsersResult);
// { users: [{ _id: "...", name: "User Name", email: "user@example.com" }, ...] }

// Logout user
const logoutResult = await logout(token);
console.log(logoutResult);
// { message: "Logout successful", clearCookie: "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0" }
```

### Integration with Express.js

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import { signup, login, logout, getUser, connectDb } from 'authmate-js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDb();

app.post('/signup', async (req, res) => {
    
app.get('/user', async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const result = await getUser(token);
  
  if (result.error) {
    return res.status(401).json({ error: result.error });
  }
  
  res.status(200).json(result);
});

app.post('/logout', async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const result = await logout(token);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  res.clearCookie("token");
  res.status(200).json(result);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 📚 API Reference

### connectDb()

Connects to the MongoDB database using the `MONGO_URI` from environment variables.

```javascript
const connected = await connectDb();
// Returns true if connection is successful, false otherwise
```

### signup(name, email, password)

Registers a new user.

```javascript
const result = await signup('User Name', 'user@example.com', 'password123');
```

**Returns:**
- Success: `{ message: "User created successfully", user: { name, email } }`
- Error: `{ error: "Error message" }`

### login(email, password)

Authenticates a user and returns a JWT token.

```javascript
const result = await login('user@example.com', 'password123');
```

**Returns:**
- Success: `{ message: "Login successful", token: "jwt_token_here" }`
- Error: `{ error: "Error message" }`


## Tech Stack

**Client:** Javascript,Express,Node,Mongodb

**Server:** Node, Express


## 🚀 About Me
I'm a full-stack developer passionate about building scalable web applications. I specialize in the MERN stack and Next js And experience integrating AI into web projects. I enjoy solving complex problems, optimizing performance, and working on real-time applications. Besides coding, I actively participate in coding competitions and tech events. Always eager to learn and explore new technologies! 🚀



## Appendix

Proficient in MERN Stack, TypeScript,Next js and AI-powered web applications.

Experienced in real-time applications using Socket.IO.

Skilled in database management with MongoDB, Prisma, and Appwrite.

Strong problem-solving abilities with 400+ DSA problems solved.

Active in coding competitions and university tech events.
Passionate about building scalable and high-performance applications.
### getUser(token)

Retrieves user information based on JWT token.

```javascript
const result = await getUser('jwt_token_here');
```

**Returns:**
- Success: `{ user: { _id, name, email } }`
- Error: `{ error: "Error message" }`

### allusers()

Gets a list of all users (without password information).

```javascript
const result = await allusers();
```

**Returns:**
- Success: `{ users: [{ _id, name, email }, ...] }`
- Error: `{ error: "Error message" }`

### logout(token)

Handles user logout.

```javascript
const result = await logout('jwt_token_here');
```

**Returns:**
- Success: `{ message: "Logout successful", clearCookie: "..." }`
- Error: `{ error: "Error message" }`

### verifytoken(token)

Verifies a JWT token and returns user information.

```javascript
const result = await verifytoken('jwt_token_here');
```

**Returns:**
- Success: `{ success: true, user: { _id, name, email } }`
- Error: `{ message: "Error message" }`

## 🔧 Error Handling

All functions return objects with either success data or error information.

Success response example:
```javascript
{
  message: "Login successful",
  token: "jwt_token_here"
}
```

Error response example:
```javascript
{
  error: "Invalid credentials"
}
```

## 📄 License

ISC

## 👨‍💻 Author

Yogesh Tiwari

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yogeshtiwari12/npm-package/issues).

## 🌟 Support

Give a ⭐️ if this project helped you!
