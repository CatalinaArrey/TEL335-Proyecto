import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {type: String, default: ""},
  pets: { type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Pet'}], default: [] }
});

module.exports = mongoose.model("User", userSchema);
