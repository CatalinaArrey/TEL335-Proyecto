import mongoose from "mongoose";
import {petSchema} from "../pets/pet.model"

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
  phone: String,
  pets: { type: [petSchema], default: [] },
});

module.exports = mongoose.model("User", userSchema);
