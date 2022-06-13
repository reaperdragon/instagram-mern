import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: String,
    required: [true, "Please Provide Image for Feed"],
  },
  caption: {
    type: String,
    required: [true, "Please Provide Desc For Feed"],
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      comment: String,
      commentedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      commentTime: { type: Date, default: Date.now()},
    },
  ],
});

export default mongoose.model("Feed", feedSchema);
