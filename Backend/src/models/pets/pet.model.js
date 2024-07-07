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

const petModel = mongoose.model("Pet", petSchema);

module.exports = {
  petSchema,
  petModel,
};