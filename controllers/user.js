import User from "../model/user.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (!email || !password || !username || !fullName) {
    throw new BadRequestError("Please Provide All Values");
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw new BadRequestError("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    fullName,
    email,
    password: hashedPassword,
  });

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

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide All the Values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Invalid Credentials");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new NotFoundError("Invalid Credentials");
  }

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

const updateUser = async (req, res) => {
  const { email, username, bio, fullName, avatar } = req.body;

  if (!email || !username || !fullName || !bio || !avatar) {
    throw new BadRequestError("Please Provide all Values");
  }

  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    {
      email: email,
      username: username,
      fullName: fullName,
      bio: bio,
      avatar: avatar,
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

export { register, login, updateUser };
