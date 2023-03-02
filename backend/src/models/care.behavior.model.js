const mongoose = require("mongoose");

const careBehaviorCategorySchema = new mongoose.Schema(
  {
    id:Number,
    name: {
      type: String,
      default: "",
    },
    description:{
        type:String,
        default:""
    },
    type: {
      type:String,
      required:true
    },
    category: {
      type:String,
      required:true
    },

  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("behaviorInterventions", careBehaviorCategorySchema);
module.exports = model;

