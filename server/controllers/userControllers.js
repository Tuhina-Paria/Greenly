import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

// COOKIE CONFIG FIXED FOR VERCEL
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,            // Always true in production (Vercel requires this)
  sameSite: "none",        // Required for cross-domain cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ------------------------------
// REGISTER USER : POST /api/user/register
// ------------------------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie (FIXED)
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------
// LOGIN USER : POST /api/user/login
// ------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please sign up",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie (FIXED)
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------
// CHECK AUTH : GET /api/user/is-auth
// ------------------------------
export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------
// LOGOUT : GET /api/user/logout
// ------------------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------
// UPDATE PROFILE : PUT /api/user/update
// ------------------------------
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    let imageUrl = null;

    // Upload image if available
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploaded.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        email,
        phone,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
