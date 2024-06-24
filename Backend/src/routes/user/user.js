import userActions from '../../actions/user/user'


exports.register =  (ctx) => {
  try{
    const params = ["username", "email", "password", "phone"]
    const data = ctx.request.body

    let error = 0
    let error_msg = ""

    params.forEach((key) => {
      let value = data[key]

      if (value === undefined || value.length === 0) {
        error_msg = `Invalid ${key}`
        error = 1
        return
      }

      const users = userActions.getAllUsers()
      if (key === "username" || key === "email") {
        users.forEach((usr) => {
          if (value === usr[key]) {
            error_msg = `${key} is already in use`
            error = 1
            return
          }
        })
      }
    })

    if (error) {
      ctx.body = {
        status: "NOK",
        error_msg,
      };
      ctx.status = 400;
      return ctx
    }

    let newUser = userActions.createUser(data)

    ctx.body = {
      status: "OK",
      user: newUser
    };
    ctx.status = 200
    return ctx
  }
  catch {
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
  catch {
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

      if (value === undefined || value.length === 0) {
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

    const msg = userActions.loginUser(ctx.request.body)
    ctx.body = {
      status: "OK",
      msg
    };
    ctx.status = 200
    return ctx

  } catch {
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
    const msg = userActions.logoutUser(ctx.request.body)
    ctx.body = {
      status: "OK",
      msg
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