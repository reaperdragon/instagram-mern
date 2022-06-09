import express from "express";
const router = express.Router();

import { updateUser } from "../controllers/user.js";

router.route("/user").patch(updateUser);

export default router;
