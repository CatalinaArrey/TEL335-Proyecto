import userActions from '../user/user'
import Pet from '../../models/pets/pet.model'
import User from '../../models/user/user.model'


const createPet = async (petData, ownerId) => {
  try {
    const user = await userActions.findUserById(ownerId);
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

const listPetsByUser = async (ownerId) => {
  try {
    const user = await User.findById(ownerId).populate("pets").exec()
    if (!user) throw new Error("User not found");

    const pets = user.pets
    return pets
  } catch (error) {
    if (error.message === "User not found") throw error;
    else {
      console.error("Error searching for pets:", error);
      throw new Error("Error searching for pets in db");
    }
  }
}

const removePet = async (petId) => {
  try {
    const user = await User.findOneAndUpdate(
      { pets: petId },
      { $pull: { pets: petId } },
      { new: true }
    ).exec()
    if (!user) throw new Error("Pet not found");

    const pet = await findPetById(petId);
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

const findPetById = async (petId) => {
  try {
    let pet;
    if (!petId.match(/^[0-9a-fA-F]{24}$/)) {
      return pet;
    }
    pet = await Pet.findById(petId);
    return pet;
  } catch (error) {
    console.error("Error searching for pet:", error);
    throw new Error("Error searching for pet in db");
  }
};

module.exports = {
  createPet,
  listPetsByUser,
  removePet,
  findPetById,
};