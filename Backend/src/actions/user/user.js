import bcrypt from "bcrypt";

const users = [];
let id = 1;


const getAllUsers = () => {
  try {
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Error retrieving user from db");
  }
};

const createUser = async (userData) => {
  try {
    // Verificar que el nombre de usuario y correo no esten en uso
    const users = getAllUsers();
    users.forEach((usr) => {
      if (userData.username.toLowerCase() === usr.username) {
        throw new Error("Username is already in use");
      }
      if (userData.email.toLowerCase() === usr.email) {
        throw new Error("Email is already in use");
      }
    });

    const hash = await bcrypt.hash(userData.password, 10);
    let newUser = {
      id: id++,
      username: userData.username.toLowerCase(),
      email: userData.email.toLowerCase(),
      password: hash,
      phone: userData.phone,
    };

    users.push(newUser);
  } catch (error) {
    if (error.message === "Username is already in use" || error.message === "Email is already in use") throw error
    else {
      console.error("Error trying to create user:", error);
      throw new Error("Error registering user to db");
    }
  }
};

const clearUsers = () => {
  try {
    users.length = 0;
  } catch (error) {
    console.error("Error in clearing users:", error);
    throw new Error("Error in clearing users");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  clearUsers,
};
