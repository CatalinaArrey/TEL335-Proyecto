import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: String,
  breed: String,
  birthday: Date,
  appointments: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Appointment' }],
    default: [],
  },
});

module.exports = mongoose.model("Pet", petSchema);
