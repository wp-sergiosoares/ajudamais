const express = require("express");

// controller functions
const {
  signupUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);
// signup route
router.post("/signup", signupUser);

// get all users
router.get("/all", getAllUsers);

// get por id
router.get("/:id", getUser);

// delete por id
router.delete("/:id", deleteUser);

module.exports = router;
