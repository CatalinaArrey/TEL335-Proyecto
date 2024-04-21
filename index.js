const Koa = require("koa");
// const cors = require('@koa/cors')
// prueba
const koaBody = require("koa-bodyparser");
const Router = require("koa-router");

const app = new Koa();
app.use(koaBody());
// app.use(cors())

var users = [];

const router = new Router();

router.post("/user", async (ctx) => {
  users.push(ctx.request.body);
  ctx.body = "listo";
});

router.get("/user", async (ctx) => {
  ctx.body = users;
});

router.post("/login", async (ctx) => {
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
});

app.use(router.routes());

app.listen(3000);
