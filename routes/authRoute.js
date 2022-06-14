import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

import { login, register } from "../controllers/auth.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);

export default router;
