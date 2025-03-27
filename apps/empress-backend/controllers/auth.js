// 3rd party modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Custom modules
import Admin from "../models/admin.js";
import { validationResult } from "express-validator";
import serverResponse from "../utils/serverResponse.js";

export async function createAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    const { errors } = validationResult(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors[0].msg,
      });
    }

    // Check if an admin already exists
    const adminExists = await Admin.findOne();
    if (adminExists) {
      return serverResponse(res, 400, "Admin already exists", null);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    const savedAdmin = await admin.save();

    return serverResponse(res, 201, "Admin created", savedAdmin);
  } catch (error) {
    next(error);
  }
}

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return serverResponse(res, 400, "Invalid email or password", null);
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return serverResponse(res, 400, "Invalid email or password", null);
    }

    // Create and assign a token
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    return serverResponse(res, 200, "Login successful", {
      token: `Bearer ${token}`,
      user: {
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function checkAuth(req, res, next) {
  try {
    if (req.isAuthenticated) {
      return serverResponse(res, 200, "Authenticated", {
        user: {
          email: req.user.email,
        },
      });
    }
    return serverResponse(res, 401, "Unauthorized", null);
  } catch (error) {
    next(error);
  }
}
