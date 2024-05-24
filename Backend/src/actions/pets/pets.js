const pets = []
let id = 1

exports.createPet = (petData, ownerId) => {
  let newPet = {
    id: id++,
    name: petData.name,
    species: petData.species,
    breed: petData.breed,
    birthday: petData.birthday,
    ownerId
  };

  pets.push(newPet);
  return newPet;
}

exports.listPetsByUser = (ownerId) => {
  const userPets = []
  pets.forEach((pet) => {
    if (pet.ownerId === ownerId) {
      userPets.push(pet)
    }
  })
  return userPets
}