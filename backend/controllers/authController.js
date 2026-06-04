const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// to generate jwt
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: " User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error while signing up:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check missing fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    //generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
