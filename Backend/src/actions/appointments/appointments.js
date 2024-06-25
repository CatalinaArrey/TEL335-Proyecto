const appointments = [];
let id = 1;

exports.listAppointmentsByPet = (petId) => {
  const petAppts = [];

  appointments.forEach((appt) => {
    if (appt.petId === petId) {
      petAppts.push(appt);
    }
  });
  return petAppts;
};

exports.scheduleAppointment = (ApptData, petId) => {
  let newAppt = {
    id: id++,
    title: ApptData.title,
    date: ApptData.date,
    place: ApptData.place,
    desc: ApptData.desc,
    petId,
  };

  appointments.push(newAppt);
  return newAppt;
};

exports.changeAppointment = (data, apptId) => {
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