import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import user from './user'

dotenv.config();
let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
};

exports.refreshAccessToken = (token) => {
  try {
    if (!refreshTokens.includes(token)) return null
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    })
    return { accessToken }
  } catch (error) {
    return null
  }
}

exports.loginUser = (data) => {
  try {
    let currentUser = {};

    const users = user.getAllUsers()
    // Autenticación
    users.some(async (user) => {
      if (
        user.email === data.identifier.toLowerCase() ||
        user.username === data.identifier.toLowerCase()
      ) {
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (isMatch) {
          currentUser = {
            id: user.id,
            username: user.username,
          };
          return true;
        }
      }
      return false;
    });

    // Generación de token
    if (currentUser) {
      const accessToken = generateAccessToken(currentUser);
      const refreshToken = jwt.sign(
        currentUser,
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);
      return { accessToken, refreshToken };
    }

    return -1;
  } catch (error) {
    console.error("Error in login:", error);
    throw new Error("Error in login");
  }
};

exports.logoutUser = (refreshToken) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  } catch (error) {
    console.error("Error in logout:", error);
    throw new Error("Error in logout");
  }
};
