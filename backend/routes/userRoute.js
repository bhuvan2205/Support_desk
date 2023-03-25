const express = require("express");
const {
  registerUser,
  loginUser,
  profile,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, profile);

module.exports = router ;
