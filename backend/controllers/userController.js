const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "5d" });
};

// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fields cannot be empty");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid User data");
  }
});

// @desc    Login user
// @route   /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Get Profile
// @route   /api/users/me
// @access  Private

const profile = (req, res) => {
  const user ={
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json({...user});
};

module.exports = { registerUser, loginUser, profile };
