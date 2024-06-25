const users = [];
let id = 1;

let currentUser = 0

exports.createUser = (userData) => {
  try{
    let newUser = {
      id: id++,
      username: userData.username.toLowerCase(),
      email: userData.email.toLowerCase(),
      password: userData.password,
      phone: userData.phone,
    };

    users.push(newUser);
    return newUser
  }
  catch (error) {
    console.error('Error trying to create user:', error)
    throw new Error('Error registering user to db')
  }
};

exports.getAllUsers = () => {
  try{
    return users
  }
  catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Error retrieving user from db");
  }
}

exports.loginUser = (data) => {
  try{
    let loginStatus = 0
    users.some((user) => {
      if (
        user.username === data.username.toLowerCase() &&
        user.password === data.password
      ) {
        currentUser = user.id;
        loginStatus = 1;
        return true;
      } 
      return false
    });
    return loginStatus;
  }
  catch (error) {
    console.error("Error in login:", error);
    throw new Error("Error in login");
  }

}

exports.logoutUser = () => {
  try{
    let loginStatus = 1
    currentUser = 0;
    loginStatus = 0;
    return loginStatus;
  }
  catch (error) {
    console.error("Error in logout:", error);
    throw new Error("Error in logout");
  }
}