const mongoose = require("mongoose");

const healthHealthHeightWeightSchema = new mongoose.Schema(
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
    submit_date_from: {
      type: String,
      default: ""
    },
    submit_date_to: {
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
    }
  },
  {
    timestamps: true,
  }
);

const HealthHeightWeight = mongoose.model("healthheightweight", healthHealthHeightWeightSchema);
module.exports = HealthHeightWeight;
