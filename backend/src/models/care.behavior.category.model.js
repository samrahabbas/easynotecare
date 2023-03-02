const mongoose = require("mongoose");

const careBehaviorCategorySchema = new mongoose.Schema(
  {
    id:Number,
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["Behavior", "Antecedents", "Intervention"],
      required: true,
    },
    enteredBy: {
      // type: mongoose.Types.ObjectId,
      // ref: "users",
      type:String,
      required:true
    },
    lastUpdatedBy: {
      // type: mongoose.Types.ObjectId,
      // ref: "users",
      type:String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("behaviorInterventionCategories", careBehaviorCategorySchema);
module.exports = model;
