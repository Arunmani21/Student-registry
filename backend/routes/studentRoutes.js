const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// POST /register
router.post("/register", studentController.registerStudent);

// GET /student/:address
router.get("/student/:address", studentController.getStudent);

module.exports = router;
