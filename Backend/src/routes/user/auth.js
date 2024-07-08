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
    ctx.status = 403;
    return ctx;
  }
};

exports.token = (ctx) => {
  try {
    const refreshToken = ctx.request.body.token;
    if (refreshToken == null) {
      ctx.status = 401;
      return ctx;
    }

    const newToken = authActions.refreshAccessToken(refreshToken);

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
    const { identifier, password } = ctx.request.body;

    // Verificar que identifier y password estén presentes
    if (!identifier || !password) {
      ctx.body = {
        status: "NOK",
        error_message: "Missing identifier or password",
      };
      ctx.status = 400;
      return ctx;
    }

    // Llamar a la función loginUser con los datos correctos
    const tokens = await authActions.loginUser({ identifier, password });

    if (tokens !== -1) {
      ctx.body = {
        status: "OK",
        ...tokens,
      };
      ctx.status = 200;
    } else {
      ctx.body = {
        status: "Unauthorized",
        msg: "Wrong credentials. Check your username/email or password",
      };
      ctx.status = 401;
    }

  } catch (error) {
    console.error(error);

    ctx.body = {
      status: "NOK",
      error_message: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;
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
