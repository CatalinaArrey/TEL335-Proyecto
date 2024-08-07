import bcrypt from "bcrypt";
import User from '../../models/user/user.model';

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Error retrieving user from db");
  }
};

const createUser = async (userData) => {
  try {
    const users = await getAllUsers();
    users.forEach((usr) => {
      if (userData.username.toLowerCase() === usr.username) {
        throw new Error("Username is already in use");
      }
      if (userData.email.toLowerCase() === usr.email) {
        throw new Error("Email is already in use");
      }
    });

    const hash = await bcrypt.hash(userData.password, 10);
    const user = new User({
      username: userData.username.toLowerCase(),
      email: userData.email.toLowerCase(),
      password: hash,
      phone: userData.phone,
    });

    const newUser = await user.save();
    return newUser;
  } catch (error) {
    if (error.message === "Username is already in use" || error.message === "Email is already in use") throw error;
    else {
      console.error("Error trying to create user:", error);
      throw new Error("Error registering user to db");
    }
  }
};

const findUserById = async (userId) => {
  try {
    let user;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return user;
    }
    user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error searching for user:", error);
    throw new Error("Error searching for user in db");
  }
};

const removeUser = async (userId) => {
  try {
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found")
    await user.deleteOne({
      _id: user._id
    })
  }
  catch (error) {
    if (error.message === "User not found") throw error
    else {
      console.error("Error trying to delete user:", error);
      throw new Error("Error removing user from db");
    }
  }
};

const loginUser = async (identifier, password) => {
  try {
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    // Retornar el usuario si las credenciales son correctas
    return user;
  } catch (error) {
    console.error("Error in login:", error);
    throw new Error("Error during login process");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  removeUser,
  findUserById,
  loginUser,
};
