console.log("USER ROUTES LOADED");
const express = require("express");
const router = express.Router();

const User = require("../src/models/User");
const authMiddleware = require("../src/middleware/auth");
const adminMiddleware = require("../src/middleware/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * 🟢 REGISTER
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 📄 GET ALL USERS (Admin only)
 */
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🧪 TEST AUTH ROUTE
 */
router.get("/test-auth", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Auth is working correctly",
    user: req.user,
  });
});

module.exports = router;