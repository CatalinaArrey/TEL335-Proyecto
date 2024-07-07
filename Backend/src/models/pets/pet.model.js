import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: String,
  breed: String,
  birthday: Date,
  appointments: { type: [mongoose.SchemaTypes.ObjectId], default: [] }
});

module.exports = mongoose.model("Pet", petSchema);
