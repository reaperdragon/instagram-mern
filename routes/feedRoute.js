import express from "express";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeed,
  getAllFollowingFeeds,
  likeFeed,
  currentUserFeeds,
  commentOnFeed,
  getAllComments,
} from "../controllers/feed.js";

const router = express.Router();

router.route("/").get(getAllFeeds).post(createFeed);
router.route("/:id").get(getFeed).delete(deleteFeed).patch(commentOnFeed);
router.route("/comments/:id").get(getAllComments);
router.route("/explore/getFollowing").get(getAllFollowingFeeds);
router.route("/like/:id").patch(likeFeed);
router.route("/profile/feeds").get(currentUserFeeds);
export default router;
