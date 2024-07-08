import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: { type: String, default: "" },
  breed: { type: String, default: "" },
  birthday: String,
  appointments: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Appointment" }],
    default: [],
  },
});

module.exports = mongoose.model("Pet", petSchema);
