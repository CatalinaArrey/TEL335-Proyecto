import userActions from '../user/user'
const User = require('../../models/user/user.model');
const Pet = require('../../models/pets/pet.model');


exports.createPet = async (petData, ownerId) => {
  try {
    const user = await userActions.getUserById(ownerId)
    if (!user) throw new Error("User not found");

    const pet = new Pet({
      name: petData.name,
      species: petData.species,
      breed: petData.breed,
      birthday: petData.birthday
    })
    const newPet = await pet.save()

    user.pets.push(newPet._id);
    await user.save()
    return newPet;
  }
  catch (error) {
    if (error.message === "User not found") throw error;
    else {
      console.error("Error trying to create pet:", error);
      throw new Error("Error registering pet to db");
    }
  }
}

exports.listPetsByUser = async (ctx) => {
  try {
    const userId = ctx.params.userId; // Asegúrate de obtener el userId correctamente desde el contexto (ctx)
    const pets = await Pet.find({ user: userId }); // Asegúrate de usar el campo correcto para buscar mascotas por usuario
    ctx.body = { pets };
  } catch (error) {
    console.error("Error searching for pets: ", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to fetch pets. Internal server error." };
  }
};


exports.removePet = async (petId) => {
  try {
    const user = await User.findOneAndUpdate(
      { pets: petId },
      { $pull: { pets: petId } },
      { new: true }
    ).exec()
    if (!user) throw new Error("Pet not found");

    const pet = await Pet.findById(petId);
    if (!pet) throw new Error("Pet not found");

    await pet.deleteOne({
      _id: pet._id,
    });
  } catch (error) {
    if (error.message === "Pet not found")
      throw error;
    else {
      console.error("Error trying to delete pet:", error);
      throw new Error("Error removing pet from db");
    }
  }
}