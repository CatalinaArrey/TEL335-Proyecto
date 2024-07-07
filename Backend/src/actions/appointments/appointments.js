import petActions from '../pets/pets'
import Appointment from '../../models/appointments/appointment.model'
import Pet from "../../models/pets/pet.model";

const listAppointmentsByPet = async (petId) => {
  try {
    const pet = await Pet.findById(petId).populate("appointments").exec();
    if (!pet) throw new Error("Pet not found");

    const appts = pet.appointments;
    return appts;
  } catch (error) {
    if (error.message === "Pet not found") throw error;
    else {
      console.error("Error searching for appointments:", error);
      throw new Error("Error searching for appointments in db");
    }
  }
};

const scheduleAppointment = async (apptData, petId) => {
  try {
    const pet = await petActions.findPetById(petId);
    if (!pet) throw new Error("Pet not found");

    
    const appt = new Appointment({
      title: apptData.title,
      date: apptData.date,
      place: apptData.place,
      desc: apptData.desc
    })
    const newAppt = await appt.save()
    pet.appointments.push(newAppt._id)
    await pet.save()
    return newAppt
  }
  catch (error) {
      if (error.message === "Pet not found") throw error;
      else {
        console.error("Error trying to create appointment:", error);
        throw new Error("Error registering appointment to db");
      }
    }
};

const changeAppointment = (data, apptId) => {
  const apptIndex = appointments.findIndex((appt) => appt.id === apptId)
  const updatedAppointment = {
    ...appointments[apptIndex],
    title: data.title,
    date: data.date,
    place: data.place,
    desc: data.desc,
  };

  appointments[apptIndex] = updatedAppointment;
  return updatedAppointment
}

const removeAppointment = async (apptId) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { appointments: apptId },
      { $pull: { appointments: apptId } },
      { new: true }
    ).exec();
    console.log(pet)
    if (!pet) throw new Error("Appointment not found");

    const appt = await findAppointmentById(apptId);
    if (!appt) throw new Error("Appointment not found");

    await appt.deleteOne({
      _id: appt._id,
    });
  } catch (error) {
    if (error.message === "Appointment not found") throw error;
    else {
      console.error("Error trying to delete appointment:", error);
      throw new Error("Error removing appointment from db");
    }
  }
};

const findAppointmentById = async (apptId) => {
  try {
    let appt;
    if (!apptId.match(/^[0-9a-fA-F]{24}$/)) {
      return appt;
    }
    appt = await Appointment.findById(apptId);
    return appt;
  } catch (error) {
    console.error("Error searching for appointment:", error);
    throw new Error("Error searching for appointment in db");
  }
};

module.exports = {
  listAppointmentsByPet,
  scheduleAppointment,
  changeAppointment,
  removeAppointment,
  findAppointmentById,
};