import userActions from '../../actions/user/user'


exports.register = async (ctx) => {
  try{
    const params = ["username", "email", "password", "phone"];
    const data = ctx.request.body;
    
    // Verificar que no haya valores invalidos (null/undefined)
    params.forEach((key) => {
      let value = data[key];
      if (!value) throw new Error(`Invalid parameter: ${key}`)
    });

    const newUser = await userActions.createUser(data);

    ctx.body = {
      status: "OK",
      newUser,
    };
    ctx.status = 201;
    return ctx;
  }
  catch (error) {
    if (
      error.message === "Username is already in use" ||
      error.message === "Email is already in use" ||
      error.message.includes("Invalid parameter")
    ) {
      ctx.body = {
        status: "NOK",
        error_msg: error.message
      };
      ctx.status = 400;
    }
    else {
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

exports.getUsers = async (ctx) => {
  try {
    // const users = userActions.getAllUsers()
    const users = await userActions.getAllUsers()

    ctx.body = {
      status: "OK",
      users
    }
    ctx.status = 200
    return ctx
  }
  catch (error) {
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
};

exports.deleteUser = async (ctx) => {
  try {
    const userId = ctx.request.params.userId;
    await userActions.removeUser(userId);
    ctx.body = {
      status: "OK",
      msg: "User was successfully removed"
    }
    ctx.status = 200
    return ctx
  }
  catch (error) {
    if (error.message === "User was not found") {
      ctx.status = 404
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    }
    else {
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