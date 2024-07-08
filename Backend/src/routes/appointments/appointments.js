import apptActions from '../../actions/appointments/appointments'


exports.getAppointmentsByPet = async (ctx) => {
  try {
    const petId = ctx.params.petId
    const appts = await apptActions.listAppointmentsByPet(petId);

    ctx.body = {
      status: "OK",
      appts,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    if (error.message === "Pet not found") {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 404;
    } else {
      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }

}

exports.createAppointment = async (ctx) => {
  try {
    const petId = ctx.params.petId
    const { date, title, place, description } = ctx.request.body;
    if (!date) throw new Error("Invalid parameter: date");
    if (!title) throw new Error("Invalid parameter: title");

    const appt = { date, title, place, description };
    const newAppt = await apptActions.scheduleAppointment(appt, petId);

    ctx.body = {
      status: "OK",
      date: newAppt,
    };
    ctx.status = 201;
    return ctx;
    
  } catch {
    if (error.message.includes("Invalid parameter")) {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 400;
    } else if (error.message === "Pet not found") {
      ctx.body = {
        status: "NOK",
        error_msg: error.message,
      };
      ctx.status = 404;
    } else {
      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
}

exports.updateAppointment = async (ctx) => {
  try {
    const { date, title, place, description } = ctx.request.body;
    const apptId = ctx.params.appointmentId

    const appt = { date, title, place, description };
    const updatedAppt = await apptActions.changeAppointment(appt, apptId);

    ctx.body = {
      status: "OK",
      date: updatedAppt,
    };
    ctx.status = 200;
    return ctx;

  } catch {
    if (error.message.includes("not found")) {
      ctx.status = 404;
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    } else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
}

exports.deleteAppointment = async (ctx) => {
  try {
    const apptId = ctx.request.params.appointmentId;
    await apptActions.removeAppointment(apptId);
    ctx.body = {
      status: "OK",
      msg: "Appointment was successfully removed",
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (error.message.includes("not found") ) {
      ctx.status = 404;
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    } else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
}

exports.getAppointmentById = async (ctx) => {
  try {
    const apptId = ctx.request.params.appointmentId;
    const appointment = await apptActions.findAppointmentById(apptId);
    if (!appointment) throw new Error("Appointment not found");

    ctx.body = {
      status: "OK",
      appointment,
    };
    ctx.status = 200;
    return ctx;
  } catch (error) {
    if (error.message === "Appointment not found") {
      ctx.status = 404;
      ctx.body = {
        status: "NOK",
        msg: error.message,
      };
    } else {
      console.error(error);

      ctx.body = {
        status: "NOK",
        error_msg: "INTERNAL SERVER ERROR",
      };
      ctx.status = 500;
    }
    return ctx;
  }
};