let users = [];

exports.createUser =  (ctx) => {
  users.push(ctx.request.body);
  ctx.body = "listo";
};

exports.getUsers = (ctx) => {
  ctx.body = users;
};

exports.login = (ctx) => {
  users.forEach((user) => {
    if (
      user.email === ctx.request.body.email &&
      user.password === ctx.request.body.password
    ) {
      ctx.body = "beinvenido";
      return;
    } else {
      ctx.body = "fuera";
    }
  });
};
