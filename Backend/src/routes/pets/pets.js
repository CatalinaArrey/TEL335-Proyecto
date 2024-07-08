import petActions from '../../actions/pets/pets'


exports.register = async (ctx) => {
  try {
    const userId = ctx.state.user.id;
    const {name, species, breed, birthday} = ctx.request.body;
    if (!name) throw new Error("Invalid parameter: name");

    const pet = { name, species, breed, birthday };
    const newPet = await petActions.createPet(pet, userId);

    ctx.body = {
      status: "OK",
      pet: newPet,
    };
    ctx.status = 201;
    return ctx;
  } catch {
    if ( error.message === "Invalid parameter: name") {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 400;
    }
    else if (error.message === "User not found") {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 404;
    }
    else{
      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }

}

exports.getPetsByUser = async (ctx) => {
  try {
    const userId = ctx.state.user.id;
    const pets = await petActions.listPetsByUser(userId);
    if (!user) throw new Error("Pets not found");

    ctx.body = {
      status: "OK",
      pets,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    if (error.message.includes("not found")) {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 404;
    } else {
      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
}

exports.deletePet = async (ctx) => {
  try {
    const petId = ctx.request.params.petId;
    await petActions.removePet(petId);
    ctx.body = {
      status: "OK",
      msg: "Pet was successfully removed",
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (error.message.includes("not found")) {
      ctx.status = 404;
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    } else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
}

exports.getPetById = async (ctx) => {
  try {
    const petId = ctx.request.params.petId;
    const pet = await petActions.findPetById(petId);
    if (!pet) throw new Error("Pet not found");

    ctx.body = {
      status: "OK",
      pet,
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (error.message === "Pet not found") {
      ctx.status = 404;
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    } else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
};