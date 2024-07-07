import petActions from '../../actions/pets/pets'


exports.register = async (ctx) => {
  try {
    const userId = ctx.request.params.userId
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
    const userId = ctx.params.userId
    const pets = await petActions.listPetsByUser(userId);

    ctx.body = {
      status: "OK",
      pets,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    if (error.message === "User not found") {
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
    const userId = ctx.request.params.userId;
    const petId = ctx.request.params.petId;
    await petActions.removePet(userId, petId);
    ctx.body = {
      status: "OK",
      msg: "Pet was successfully removed",
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (
      error.message === "Pet not found" ||
      error.message === "User not found"
    ) {
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