import User from "../model/user.js";
import Feed from "../model/feed.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinaryConfig.js";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const updateUser = async (req, res) => {
  const { email, username, bio, fullName, avatar } = req.body;

  if (!email || !username || !fullName || !bio || !avatar) {
    throw new BadRequestError("Please Provide all Values");
  }

  const mediaRes = await cloudinary.v2.uploader.upload(avatar, {
    folder: "instagram-app/user-profiles",
    use_filename: true,
  });

  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    {
      email: email,
      username: username,
      fullName: fullName,
      bio: bio,
      avatar: mediaRes.secure_url,
    },
    {
      new: true,
    }
  );

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userEmail: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    _id: user._id,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
    username: user.username,
    token,
  });
};

const followUser = async (req, res) => {
  const { userId } = req.body;
  const currentId = req.user.userId;

  let user;
  //add in follower
  user = await User.findByIdAndUpdate(
    userId,
    {
      $push: { followers: currentId },
    },
    {
      new: true,
    }
  );

  //add in following
  user = await User.findByIdAndUpdate(
    currentId,
    {
      $push: { following: userId },
    },
    { new: true }
  );

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userEmail: user.email,
      userFollowing: user.following,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    _id: user._id,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
    username: user.username,
    token,
  });
};

const unFollowUser = async (req, res) => {
  const { userId } = req.body;
  const currentId = req.user.userId;

  let user;

  //remove from followers
  user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { followers: currentId },
    },
    {
      new: true,
    }
  );

  //remove from following
  user = await User.findByIdAndUpdate(
    currentId,
    {
      $pull: { following: userId },
    },
    { new: true }
  );

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userEmail: user.email,
      userFollowing: user.following,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    _id: user._id,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email,
    fullName: user.fullName,
    followers: user.followers,
    following: user.following,
    username: user.username,
    token,
  });
};

const userProfile = async (req, res) => {
  const { id: user_id } = req.params;
  let user = await User.findOne({ _id: user_id })
    .populate("followers", "_id username fullName email avatar bio")
    .populate("following", "_id username fullName email avatar bio");

  let feed = await Feed.find({ postedBy: user_id })
    .sort({ createdAt: -1 })
    .populate("postedBy", "_id username fullName email avatar bio")
    .populate("comments.commentedBy", "_id username fullName email avatar bio");

  //feed count
  feed.map((data, index) => {
    return { ...data._doc, liked: data.likes.includes(user_id) };
  });

  user.password = undefined;

  let totalFollowers = user.followers.length;
  let totalFollowings = user.following.length;

  let totalPosts = feed.length;

  res.status(StatusCodes.OK).json({
    user,
    totalFollowers,
    totalFollowings,
    totalPosts,
    feed,
  });
};

const searchUser = async (req, res) => {
  const { search } = req.query;

  const user = await User.find({
    username: { $regex: search, $options: "i" },
  }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

export { updateUser, followUser, unFollowUser, userProfile, searchUser };
