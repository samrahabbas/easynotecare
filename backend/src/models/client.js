const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      default: "",
    },
    gender: {
        type: String,
        enum: ["Male","Female"],
        default: "",
    },
    address: {
      type: String,
      default: "",
    },
   
    admission_type: {
      type: String,
      default: ""
    },
    status: {
        type: Boolean,
        default: false,
    },
    client_type: {
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

const model = mongoose.model("client", clientSchema);
module.exports = model;
