import Router from "koa-router";
import user from "./user/user"

const router = new Router();

router.post("/user", user.createUser);

router.get("/user", user.getUsers);

router.post("/login", user.login);

export default router
