const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/", studentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "Welcome To Registration API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
