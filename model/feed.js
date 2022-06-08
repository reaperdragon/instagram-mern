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
  desc: {
    type: String,
    required: [true, "Please Provide Desc For Feed"],
  },
  likes: {
    type: [String],
    default: [],
  },
  comment: {
    type: [mongoose.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
});

export default mongoose.model("Feed", feedSchema);
