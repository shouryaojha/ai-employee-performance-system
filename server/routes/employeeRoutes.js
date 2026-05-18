const express = require("express");

const {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addEmployee);

router.get("/", getEmployees);

router.get("/search", searchEmployees);

router.put("/:id", protect, updateEmployee);

router.delete("/:id", protect, deleteEmployee);

module.exports = router;