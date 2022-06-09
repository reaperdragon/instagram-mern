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

export { updateUser };
