import { StatusCodes } from "http-status-codes";
import Feed from "../model/feed.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const getAllFeeds = async (req, res) => {
  const feed = await Feed.find({})
    .sort({ createdAt: -1 })
    .populate("postedBy", "_id username fullName email avatar bio")
    .populate("comments.commentedBy", "_id username fullName email avatar bio");

  res.status(StatusCodes.OK).json({ feed });
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
  const { id: postId } = req.params;

  const feed = await Feed.findById({ _id: postId })
    .populate("postedBy", "_id username fullName email avatar bio")
    .populate("comments.commentedBy", "_id username fullName email avatar bio");

  res.status(StatusCodes.OK).json({ feed });
};

const deleteFeed = async (req, res) => {
  const { id: postId } = req.params;

  const feed = await Feed.findOne({ _id: postId });

  if (!feed) {
    throw new NotFoundError(`No Feed With Id : ${id}`);
  }

  checkPermissions(req.user, feed.postedBy);

  const deleteFeed = await Feed.findByIdAndRemove({ _id: postId });
  res.status(StatusCodes.OK).json({ deleteFeed });
};

const likeFeed = async (req, res) => {
  try {
    res.send("Like Feed!");
  } catch (error) {
    res.send(error);
  }
};

export { getAllFeeds, getFeed, createFeed, deleteFeed, likeFeed };
