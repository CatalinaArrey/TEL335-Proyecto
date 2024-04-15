const Koa = require('koa');
// const cors = require('@koa/cors')
const koaBody = require('koa-bodyparser');
const Router = require('koa-router')

const app = new Koa();
app.use(koaBody())
// app.use(cors())

var users = []

const router = new Router();

router.post("/user", async (ctx) => {
  users.push(ctx.request.body.name)
  ctx.body = "listo"
})

router.get("/user", async (ctx) => {
  ctx.body = users
})

app.use(router.routes())

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(3000);