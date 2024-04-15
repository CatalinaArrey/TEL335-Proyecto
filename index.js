const Koa = require("koa");
// const cors = require('@koa/cors')
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
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === ctx.request.body.email &&
      users[i].password === ctx.request.body.password
    ) {
      ctx.body = "beinvenido";
      break;
    } else {
      ctx.body = "fuera";
    }
  }
});

app.use(router.routes());

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(3000);
