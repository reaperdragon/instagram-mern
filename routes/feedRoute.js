import express from "express";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeed,
  getAllFollowingFeeds,
  likeFeed,
  currentUserFeeds,
} from "../controllers/feed.js";

const router = express.Router();

router.route("/").get(getAllFeeds).post(createFeed);
router.route("/:id").get(getFeed).delete(deleteFeed);
router.route("/explore/getFollowing").get(getAllFollowingFeeds);
router.route("/like/:id").patch(likeFeed);
router.route("/profile/feeds").get(currentUserFeeds);
export default router;
