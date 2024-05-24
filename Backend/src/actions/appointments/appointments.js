const appointments = [];

exports.listAppointmentsByPet = (petId) => {
  const petAppts = [];

  appointments.forEach((appt) => {
    if (appt.petId === petId) {
      petAppts.push(appt);
    }
  });
  return petAppts;
};
