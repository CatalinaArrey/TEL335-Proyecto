import userActions from '../../actions/user/user'


exports.register =  (ctx) => {
  try{
    const params = ["username", "email", "password", "phone"];
    const data = ctx.request.body;

    let error = 0;
    let error_msg = "";

    // Verificar que no haya valores invalidos (null/undefined)
    params.every((key) => {
      let value = data[key];

      if (!value) {
        error_msg = `Invalid ${key}`;
        error = 1;
        return false;
      }

      // Verificar que el nombre de usuario y email no esten en uso
      const users = userActions.getAllUsers();
      if (key === "username" || key === "email") {
        users.every((usr) => {
          if (value.toLowerCase() === usr[key]) {
            error_msg = `${key} is already in use`;
            error = 1;
            return false;
          }
        });
      }
      return true

    });

    if (error) {
      ctx.body = {
        status: "NOK",
        error_msg,
      };
      ctx.status = 400;
      return ctx;
    }

    let newUser = userActions.createUser(data);

    ctx.body = {
      status: "OK",
      user: newUser,
    };
    ctx.status = 200;
    return ctx;
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

exports.login = (ctx) => {
  try {
    const params = ["username", "password"]
    const data = ctx.request.body

    let error = 0;
    let error_msg = "";

    params.forEach((key) => {
      let value = data[key];

      if (!value) {
        error_msg = `${key} is missing`;
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

    const loginStatus = userActions.loginUser(ctx.request.body)

    if (loginStatus) {
      ctx.body = {
        status: "OK",
        msg: "Login successful",
      };
      ctx.status = 200;
    }
    else {
      ctx.body = {
        status: "Unauthorized",
        msg: "Wrong credentials. Check your username or password",
      };
      ctx.status = 401;
    }
    return ctx

  } catch (error) {
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_message: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
};

exports.logout = (ctx) => {
  try {
    const loginStatus = userActions.logoutUser(ctx.request.body)
    if (!loginStatus) {
      ctx.body = {
        status: "OK",
        msg: "Logged out successfully",
      };
      ctx.status = 200;
      return ctx;
    }
    else {
      throw new Error('Error in logout')
    }
  } catch (error){
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
  
}