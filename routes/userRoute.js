import express from "express";
import {
  followUser,
  searchUser,
  unFollowUser,
  updateUser,
  userProfile,
} from "../controllers/user.js";

const router = express.Router();

router.route("/user").patch(updateUser);

router.route("/userProfile/:id").get(userProfile);

router.route("/followUser").patch(followUser);

router.route("/unFollowUser").patch(unFollowUser);

router.route("/search/user").get(searchUser);

export default router;
