import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const user = require('../../models/user/user.model');

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


exports.loginUser = async (data) => {
  try {
    if (!data.identifier || !data.password) {
      throw new Error('Missing identifier or password');
    }

    const users = await user.find(); // Asegúrate de que find() esté disponible en User

    let currentUser = null;

    // Encuentra al usuario que coincida con el identifier (email o username) y verifica la contraseña
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
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
          break;
        }
      }
    }

    // Si se encontró un usuario válido, genera tokens
    if (currentUser) {
      const accessToken = generateAccessToken(currentUser);
      const refreshToken = jwt.sign(currentUser, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      return { accessToken, refreshToken };
    }

    // Si no se encontró un usuario válido
    return -1;

  } catch (error) {
    console.error("Error in loginUser:", error);
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
