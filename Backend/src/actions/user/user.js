let users = [];
let id = 1;

exports.createUser = (userData) => {
  let newUser = {
    id: id++,
    name: userData.name,
    email: userData.email,
    password: userData.password,
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
      msg = "bienvenido";
      return
    } else {
      msg = "fuera";
    }
  });
  msg = 'hola'
  console.log(msg)
  return msg

}