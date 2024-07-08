import petActions from '../pets/pets'
import Appointment from '../../models/appointments/appointment.model'
import Pet from "../../models/pets/pet.model";
import User from "../../models/user/user.model"

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

    console.log(apptData.petName);
    const pet = await Pet.findOne({name: apptData.petName});
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

const changeAppointment = async (data, apptId) => {
  try {
    const appointment = findAppointmentById(apptId);
    if (!appointment) throw new Error("Appointment not found")

    const newData = {
      title: data.title || appointment.title,
      date: data.date || appointment.date,
      place: data.place || appointment.place,
      description: data.description || appointment.description,
    };
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      apptId,
      newData,
      { new: true, runValidators: true }
    );

    return updatedAppointment
  }
  catch (error) {
    if (error.message.includes("not found")) throw error;
    else {
      console.error("Error updating appointment:", error);
      throw new Error("Error updating appointment data");
    }
  }
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

const listAppointmentsByUser = async (ownerId) => {
  try {
    let pets;
    if (!ownerId.match(/^[0-9a-fA-F]{24}$/)) throw new Error("User not found");

    const user = await User.findById(ownerId).populate("pets").exec();
    if (!user) throw new Error("User not found");
    pets = user.pets;
    if (!pets) throw new Error("Pets not found");
    let appts = []

for (const pet of pets) {
  const petFull = await Pet.findById(pet._id).populate("appointments").exec();
  const petAppts = petFull.appointments;
  console.log(petAppts);
  if (petAppts.length > 0) {
    console.log("yes");
    petAppts.forEach((appt) => {
      console.log(appt);
      appts.push(appt);
    });
  }
}

      console.log(appts);

    return appts;
  } catch (error) {
    console.error("Error searching for appointments: ", error);
    throw new Error("Error searching for appointments")
  }
};


module.exports = {
  listAppointmentsByPet,
  scheduleAppointment,
  changeAppointment,
  removeAppointment,
  findAppointmentById,
  listAppointmentsByUser,
};