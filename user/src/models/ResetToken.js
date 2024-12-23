import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const ResetToken = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please provide userID"],
  },
  token: {
    type: String,
    required: [true, "Please provide token"],
  },
});

export default mongoose.model("reset_token", ResetToken);
