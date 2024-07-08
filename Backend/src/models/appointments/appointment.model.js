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
  place: String,
  description: Text,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
