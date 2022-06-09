import express from "express";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeed,
  likeFeed,
} from "../controllers/feed.js";

const router = express.Router();

router.route("/").get(getAllFeeds).post(createFeed);
router.route("/:id").get(getFeed).delete(deleteFeed);
router.route("/:id/like").patch(likeFeed);

export default router;
