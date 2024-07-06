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

    await userActions.createUser(data);

    ctx.body = {
      status: "OK",
      msg: "User created successfully"
    };
    ctx.status = 200;
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

exports.getUsers = (ctx) => {
  try {
    const users = userActions.getAllUsers()

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
