const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

/**
 * Root
 */
app.get("/", (req, res) => {
  res.send("Nexora AI Backend is running 🚀");
});

/**
 * Routes
 */
app.use("/api/users", userRoutes);

module.exports = app;