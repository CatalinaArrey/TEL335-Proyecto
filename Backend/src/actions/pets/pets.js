import userActions from '../user/user'
import {petModel} from '../../models/pets/pet.model'


exports.createPet = async (petData, ownerId) => {
  try {
    const user = await userActions.getUserById(ownerId)
    if (!user) throw new Error("User not found");

    const newPet = {
      name: petData.name,
      species: petData.species,
      breed: petData.breed,
      birthday: petData.birthday
    };

    user.pets.push(newPet);
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

exports.listPetsByUser = async (ownerId) => {
  try {
    const user = await userActions.getUserById(ownerId)
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

exports.removePet = async (ownerId, petId) => {
  try {
    const user = await userActions.getUserById(ownerId);
    if (!user) throw new Error("User not found");

    const pet = user.pets.id(petId)
    if (!pet) throw new Error("Pet not found");

    user.pets.pull({ _id: petId });
    await user.save();
  } catch (error) {
    if (error.message === "Pet not found" || error.message === "User not found")
      throw error;
    else {
      console.error("Error trying to delete pet:", error);
      throw new Error("Error removing pet from db");
    }
  }
}