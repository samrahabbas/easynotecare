const mongoose = require("mongoose");

const AgencyDocumentSchema = new mongoose.Schema(
  {
    company_code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    mimetype:{
        type:String,
        default:""
    },
    name: {
      type: String,
      default: "",
    },
    receivedDate: {
      type: Date,
      required: true,
    },
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
    description: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
    path: {
      type: String,
      default: "",
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "users",
    // },
    enteredBy: {
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

const Programs = mongoose.model("agency_document", AgencyDocumentSchema);

module.exports = Programs;
