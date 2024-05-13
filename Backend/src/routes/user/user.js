import userActions from '../../actions/user/user'


exports.register =  (ctx) => {
  // parametros: name, email, password
  let newUser = userActions.createUser(ctx.request.body)

  ctx.body = {
    status: "OK",
    user: newUser
  };
};

exports.getUsers = (ctx) => {
  ctx.body = userActions.getAllUsers()
};

exports.login = (ctx) => {
  ctx.body = userActions.loginUser(ctx.request.body)
};
