import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../../models/user/user.model'
import Token from '../../models/token/token.model'

dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET
  );
  const refreshToken = new Token({
    token,
    userId: user.id,
  });
  refreshToken.save();
  return token
}

exports.refreshAccessToken = (token) => {
  try {
    const refreshToken = Token.findOne({
      token: token,
    });
    if (!refreshToken) return null;
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
    const user = await User.findOne({
      $or: [{ username: data.identifier }, { email: data.identifier }],
    });
    if (!user) throw new Error("Wrong username/email")

    // Autenticación
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new Error("Wrong password")
    
    // Generación de token
    const accessToken = generateAccessToken({
      id: user._id,
      username: user.username,
    });
    const refreshToken = generateRefreshToken({
      id: user._id,
      username: user.username,
    });
    
    return { accessToken, refreshToken }

  } catch (error) {
    if (error.message.includes("Wrong")) throw error
    else {
      console.error("Error in login:", error);
      throw new Error("Error in login");
    }
  }
};

exports.logoutUser = async (refreshToken) => {
  try {
    await Token.deleteOne({
      token: refreshToken
    })
  } catch (error) {
    console.error("Error in logout:", error);
    throw new Error("Error in logout");
  }
};
