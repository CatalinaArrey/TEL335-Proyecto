import petActions from '../../actions/pets/pets'


exports.register = (ctx) => {
  try {
    const params = ["name", "species", "breed", "birthday"];
    const data = ctx.request.body;

    let error = 0;
    let error_msg = "";

    const userId = 1; // HARDCODED

    params.forEach((key) => {
      let value = data[key];

      if (value === undefined || value.length === 0) {
        error_msg = `Invalid ${key}`;
        error = 1;
        return;
      }
    });

    if (error) {
      ctx.body = {
        status: "NOK",
        error_msg,
      };
      ctx.status = 400;
      return ctx;
    }

    let newPet = petActions.createPet(data, userId);

    ctx.body = {
      status: "OK",
      pet: newPet,
    };
    ctx.status = 200;
    return ctx;
  } catch {
    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }

}

exports.getPetsByUser = (ctx) => {
  try {
    const userId = Number(ctx.params.userId)
    const pets = petActions.listPetsByUser(userId);

    ctx.body = {
      status: "OK",
      pets,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
}