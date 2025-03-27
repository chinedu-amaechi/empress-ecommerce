// 3rd party modules
import express from "express";

// Custom modules
import * as authControllers from "../controllers/auth.js";
import adminValidationRules from "../utils/rules/adminRules.js";

/*
 * The express.Router class can be used to create modular, mountable route handlers.
 */

const router = express.Router();

// Route to create an admin
router.post("/create/admin", adminValidationRules, authControllers.createAdmin);

// Route to login an admin
router.post("/login/admin", authControllers.loginAdmin);

// Route to check if the request is authenticated
router.get("/check/auth", authControllers.checkAuth);

export default router;
