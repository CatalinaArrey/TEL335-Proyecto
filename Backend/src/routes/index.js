import Router from 'koa-router'
import getHealth from './health/health'
import user from './user/user'
import auth from './user/auth'
import pets from './pets/pets'
import appointments from './appointments/appointments'

const router = new Router()

router.get('/health', getHealth)


router.post("/user", user.register);
// router.get("/user", auth.authenticateToken, user.getUsers);
router.get("/user", user.getUsers);
router.delete("/user/:userId", user.deleteUser)

router.post("/auth/login", auth.login);
router.post("/auth/token", auth.token);
router.post("/auth/logout", auth.logout);

router.post("/pets/:userId", pets.register);
router.get("/pets/:userId", pets.getPetsByUser)
router.delete("/pets/:petId", pets.deletePet);

router.get("/appointments/:petId", appointments.getAppointmentsByPet)
router.post("/appointments/:petId", appointments.createAppointment)
router.put("/appointments/:appointmentId", appointments.updateAppointment)

export default router
