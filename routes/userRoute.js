import express from "express";
import { followUser, unFollowUser, updateUser, userProfile } from "../controllers/user.js";

const router = express.Router();

router.route("/user").patch(updateUser);

router.route('/userProfile').get(userProfile);

router.route("/followUser").patch(followUser);

router.route("/unFollowUser").patch(unFollowUser);

export default router;
