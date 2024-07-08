import authActions from '../../actions/user/auth'
import jwt from "jsonwebtoken";


exports.authenticateToken = async (ctx, next) => {
  try {
    const authHeader = ctx.request.header.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      ctx.status = 401;
      return ctx;
    }
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    ctx.state.user = user;
    await next();
  } catch (err) {
    console.error(err)
    ctx.status = 403;
    return ctx;
  }
};

exports.token = async (ctx) => {
  try {
    const refreshToken = ctx.request.body.token;
    if (!refreshToken) {
      ctx.status = 401;
      return ctx;
    }

    const newToken = await authActions.refreshAccessToken(refreshToken);

    if (!newToken) {
      ctx.status = 403;
      return ctx;
    }
    ctx.body = newToken;
    return ctx;
  }
  catch (error) {
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_message: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
}

exports.login = async (ctx) => {
  try {
    const { identifier, password } = ctx.request.body
    if (!identifier) throw new Error("Missing username/email");
    if (!password) throw new Error("Missing password");

    const userData = { identifier, password };
    const tokens = await authActions.loginUser(userData);

    if (!tokens.accessToken || !tokens.refreshToken) throw new Error("Wrong credentials")
    
    ctx.body = {
      status: "OK",
      ...tokens,
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (error.message.includes("Wrong") || error.message.includes("Missing")) {
      ctx.body = {
        status: "Unauthorized",
        msg: "Wrong credentials. Check your username/email or password",
      };
      ctx.status = 401;
    }
    else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_message: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }

    return ctx;
  }
};

exports.logout = (ctx) => {
  try {
    const token = ctx.request.body.token
    authActions.logoutUser(token)

    ctx.status = 204
    ctx.body = {
      status: "OK",
      msg: "Logged out successfully"
    }
    return ctx
  } catch (error) {
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }
}
