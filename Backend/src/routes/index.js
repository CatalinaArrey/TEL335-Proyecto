import Router from 'koa-router'
import getHealth from './health/health'
import user from './user/user'

const router = new Router()

router.get('/health', getHealth)


router.post("/user", user.register);

router.get("/user", user.getUsers);

router.post("/login", user.login);

export default router
