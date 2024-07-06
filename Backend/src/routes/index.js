import Router from 'koa-router'
import getHealth from './health/health'
import user from './user/user'
import auth from './user/auth'
import pets from './pets/pets'
import appointments from './appointments/appointments'

const router = new Router()

router.get('/health', getHealth)


router.post("/user", user.register);
router.get("/user", auth.authenticateToken, user.getUsers);

router.post("/auth/login", auth.login);
router.post("/auth/token", auth.token);
router.post("/auth/logout", auth.logout);

router.post("/pets", pets.register)
router.get("/pets/:userId", pets.getPetsByUser)

router.get("/appointments/:petId", appointments.getAppointmentsByPet)
router.post("/appointments/:petId", appointments.createAppointment)
router.put("/appointments/:appointmentId", appointments.updateAppointment)

export default router
