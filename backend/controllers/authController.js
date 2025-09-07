import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    return res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔎 Login attempt:", { email, password });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ Found user:", user.email);
    console.log("Stored password hash in DB:", user.password);

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
