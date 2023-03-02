const mongoose = require("mongoose");

const healthAppointmentSchema = new mongoose.Schema(
  {
    
    form_id: {
      type: String,
      default: "",
    },
    program_site: {
        type: String,
        default: "",
    },
    individual: {
      type: String,
      default: "",
    },
    entered_by: {
      type: String,
      default: ""
    },
    appointment_date_from: {
      type: String,
      default: ""
    },
    appointment_date_to: {
      type: String,
      default: ""
    },
    specialty: {
      type: String,
      default: ""
    },
    appointment_reason: {
      type: String,
      default: ""
    },
    appointment_status: {
      type: String,
      default: ""
    },
    notification_level: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: ""
    },
    consultant: {
      type: String,
      default: ""
    },
    hospital_name: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

const HealthAppointment = mongoose.model("healthappointment", healthAppointmentSchema);
module.exports = HealthAppointment;
