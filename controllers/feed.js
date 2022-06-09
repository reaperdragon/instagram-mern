import { StatusCodes } from "http-status-codes";
import Feed from "../model/feed.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const getAllFeeds = async (req, res) => {
  try {
    res.send("Get All Feeds!");
  } catch (error) {
    res.send(error);
  }
};

const createFeed = async (req, res) => {
  const { caption, post } = req.body;

  const user = req.user.userId;

  if (!caption || !post || !user) {
    throw new BadRequestError("Please Provide All Values");
  }

  const mediaRes = await cloudinary.v2.uploader.upload(post, {
    folder: "instagram-app/feeds",
    use_filename: true,
  });

  const feed = await Feed.create({
    caption,
    post: mediaRes.secure_url,
    postedBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ feed });
};

const getFeed = async (req, res) => {
  try {
    res.send("Get Feed!");
  } catch (error) {
    res.send(error);
  }
};

const deleteFeed = async (req, res) => {
  try {
    res.send("Delete Feed!");
  } catch (error) {
    res.send(error);
  }
};

const likeFeed = async (req, res) => {
  try {
    res.send("Like Feed!");
  } catch (error) {
    res.send(error);
  }
};

export { getAllFeeds, getFeed, createFeed, deleteFeed, likeFeed };
