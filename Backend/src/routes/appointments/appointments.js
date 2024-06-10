import apptActions from '../../actions/appointments/appointments'


exports.getAppointmentsByPet = (ctx) => {
  try {
    const petId = Number(ctx.params.petId);
    const appts = apptActions.listAppointmentsByPet(petId);

    ctx.body = {
      status: "OK",
      appts,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    ctx.body = {
      status: "NOK",
      error_msg: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500;

    return ctx;
  }

}

exports.createAppointment = (ctx) => {

}

exports.updateAppointment = (ctx) => {

}