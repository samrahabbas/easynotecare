const express = require("express");
const {
  getAllBehaviorCategories,
  getBehaviorCategory,
  createBehaviorCategory,
  updateBehaviorCategory,
  deleteBehaviorCategory
} = require("../controllers/care.behavior.category.controller");
const { createBehavior, getBehavior, deleteBehavior, updateBehavior, getAllBehaviors } = require("../controllers/care.behavior.controller");


const careBehaviorRouter = express.Router();
// For Behavior Antecedent Intervention Categories
careBehaviorRouter
  .route("/behavior/category/get/all")
  .get(getAllBehaviorCategories);
careBehaviorRouter.route("/behavior/category/get/:id").get(getBehaviorCategory);
careBehaviorRouter
  .route("/behavior/category/delete/:id")
  .delete(deleteBehaviorCategory);
careBehaviorRouter
  .route("/behavior/category/update/:id")
  .put(updateBehaviorCategory);
careBehaviorRouter
  .route("/behavior/category/create")
  .post(createBehaviorCategory);

// For Behavior Antecedent Intervention
careBehaviorRouter.route("/behavior/get/all").get(getAllBehaviors);
careBehaviorRouter.route("/behavior/get/:id").get(getBehavior);
careBehaviorRouter.route("/behavior/delete/:id").delete(deleteBehavior);
careBehaviorRouter.route("/behavior/update/:id").put(updateBehavior);
careBehaviorRouter.route("/behavior/create").post(createBehavior);

module.exports = careBehaviorRouter;
