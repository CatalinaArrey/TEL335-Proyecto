const users = [];
let id = 1;

let currentUser = 0

exports.createUser = (userData) => {
  let newUser = {
    id: id++,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    phone: userData.phone
  };

  users.push(newUser);
  return newUser
};

exports.getAllUsers = () => {
  return users
}

exports.loginUser = (data) => {
  let msg;
  users.forEach((user) => {
    if (
      user.email === data.email &&
      user.password === data.password
    ) {
      currentUser = user.id
      msg = `Welcome ${user.username}`;
      return
    } else {
      msg = "Wrong email or password";
    }
  });
  return msg

}

exports.logoutUser = () => {
  currentUser = 0
  let msg = "Logged out successfully"
  return msg
}