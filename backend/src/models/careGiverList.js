const mongoose = require("mongoose");

const careGiverSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      default: "",
    },
    tracking_id: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    phone: {
      type: String,
      default: "",
    },
   
    office: {
      type: String,
      default: ""
    },
    status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "",
    },
    ssn: {
        type: String,
        default: "",
    },
    date_of_birth: {
        type: String,
        default: "",
    },
    hire_date: {
        type: String,
        default: "",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("careGiver", careGiverSchema);
module.exports = model;
