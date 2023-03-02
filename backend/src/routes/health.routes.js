const express = require('express');
const { getHealth, createHealth, addAllergy, updateAllergy, updateDiagnosis,
    healthDetails, addDiagnostics, deleteAllergy, deleteDiagnosis } = require("../controllers/health.controller");
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const healthRouter = express.Router();

healthRouter.route("/get/:id").get(isLogedIn, getHealth);

healthRouter.route("/create").post(isLogedIn, createHealth);

healthRouter.route("/addAllergy").put(isLogedIn, addAllergy);

healthRouter.route("/addDiagnostics").put(isLogedIn, addDiagnostics);

healthRouter.route("/deleteAllergy").put(isLogedIn, deleteAllergy);

healthRouter.route("/deleteDiagnosis").put(isLogedIn, deleteDiagnosis);

healthRouter.route("/updateAllergy").put(isLogedIn, updateAllergy);

healthRouter.route("/updateDiagnosis").put(isLogedIn, updateDiagnosis);

healthRouter.route("/updateHealthDetails").put(isLogedIn, healthDetails);

module.exports = healthRouter;