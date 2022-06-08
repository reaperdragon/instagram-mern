import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    required: [true, "Please Provide Image for Feed"],
  },
  caption: {
    type: String,
    required: [true, "Please Provide Desc For Feed"],
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      comment: String,
      postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        commentTime: { type: Date, default: Date.now() },
      },
    },
  ],
});

export default mongoose.model("Feed", feedSchema);
