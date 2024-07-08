import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
