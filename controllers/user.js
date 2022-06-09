import User from "../model/user.js";
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

  res.status(StatusCodes.OK).json({ user, token });
};

const followUser = async (req, res) => {
  const { userId } = req.body;
  const currentId = req.user.userId;

  //follower
  await User.findByIdAndUpdate(
    userId,
    {
      $push: { followers: currentId },
    },
    {
      new: true,
    }
  );

  //following
  await User.findByIdAndUpdate(
    currentId,
    {
      $push: { following: userId },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json("Following");
};

const unFollowUser = async (req, res) => {
  const { userId } = req.body;
  const currentId = req.user.userId;

  //unFollow
  await User.findByIdAndUpdate(
    userId,
    {
      $pull: { followers: currentId },
    },
    {
      new: true,
    }
  );

  //unFollowing
  await User.findByIdAndUpdate(
    currentId,
    {
      $pull: { following: userId },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json("UnFollowing");
};

const userProfile = async (req, res) => {
  const isUserExists = await User.findOne({ _id: req.user.userId })
    .populate("followers", "_id username fullName email avatar bio")
    .populate("following", "_id username fullName email avatar bio");

  isUserExists.password = undefined;

  let totalFollowers = isUserExists.followers.length;
  let totalFollowings = isUserExists.following.length;

  res
    .status(StatusCodes.OK)
    .json({ isUserExists, totalFollowers, totalFollowings });
};

export { updateUser, followUser, unFollowUser, userProfile };
