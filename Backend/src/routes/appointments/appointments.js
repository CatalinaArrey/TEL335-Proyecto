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
  try {
    const params = ["date", "title"];
    const optionalParams = ["desc", "place"];

    const petId = Number(ctx.params.petId);
    const data = ctx.request.body;

    let error = 0;
    let error_msg = "";

    params.forEach((key) => {
      let value = data[key];

      if (value === undefined || value.length === 0) {
        error_msg = `Invalid ${key}`;
        error = 1;
        return;
      }
    });

    optionalParams.forEach((key) => {
      let value = data[key];
      if (value===undefined || value===null) {
        data[key] = ""
      }
    })

    if (error) {
      ctx.body = {
        status: "NOK",
        error_msg,
      };
      ctx.status = 400;
      return ctx;
    }

    let newAppt = apptActions.scheduleAppointment(data, petId);

    ctx.body = {
      status: "OK",
      date: newAppt,
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

exports.updateAppointment = (ctx) => {
  try {
    // const params = ["date", "title", "desc", "place"];

    const apptId = Number(ctx.params.appointmentId);
    const data = ctx.request.body;

    let error = 0;
    let error_msg = "";

    // params.forEach((key) => {
    //   let value = data[key];

    //   if (value === undefined || value.length === 0) {
    //     error_msg = `Invalid ${key}`;
    //     error = 1;
    //     return;
    //   }
    // });

    // optionalParams.forEach((key) => {
    //   let value = data[key];
    //   if (value === undefined || value === null) {
    //     data[key] = "";
    //   }
    // });

    if (error) {
      ctx.body = {
        status: "NOK",
        error_msg,
      };
      ctx.status = 400;
      return ctx;
    }

    let updatedAppt = apptActions.changeAppointment(data, apptId);

    ctx.body = {
      status: "OK",
      date: updatedAppt,
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