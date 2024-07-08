import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  place: { type: String, default: "" },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
