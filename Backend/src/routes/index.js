import Router from 'koa-router'
import getHealth from './health/health'
import user from './user/user'
import auth from './user/auth'
import pets from './pets/pets'
import appointments from './appointments/appointments'

const router = new Router()

router.get('/health', getHealth)


router.post("/user", user.register);
router.get("/users", user.getUsers);
router.get("/user", auth.authenticateToken, user.getUserById);
router.delete("/user/:userId", user.deleteUser)

router.post("/auth/login", auth.login);
router.post("/auth/token", auth.token);
router.post("/auth/logout", auth.logout);

router.post("/pet", auth.authenticateToken, pets.register);
router.get("/pets", auth.authenticateToken, pets.getPetsByUser);
router.get("/pet/:petId", pets.getPetById);
router.delete("/pet/:petId", pets.deletePet);

router.post("/appointment/:petId", appointments.createAppointment)
router.get("/appointments/:petId", appointments.getAppointmentsByPet);
router.get("/appointment/:appointmentId", appointments.getAppointmentById);
router.put("/appointment/:appointmentId", appointments.updateAppointment)
router.delete("/appointment/:appointmentId", appointments.deleteAppointment)

export default router
