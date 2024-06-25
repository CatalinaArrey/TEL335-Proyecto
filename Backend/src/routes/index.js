import Router from 'koa-router'
import getHealth from './health/health'
import user from './user/user'
import pets from './pets/pets'
import appointments from './appointments/appointments'

const router = new Router()

router.get('/health', getHealth)


router.post("/user", user.register);
router.get("/user", user.getUsers);
router.post("/login", user.login);
router.post("/logout", user.logout)

router.post("/pets", pets.register)
router.get("/pets/:userId", pets.getPetsByUser)

router.get("/appointments/:petId", appointments.getAppointmentsByPet)
router.post("/appointments/:petId", appointments.createAppointment)
router.put("/appointments/:appointmentId", appointments.updateAppointment)

export default router
