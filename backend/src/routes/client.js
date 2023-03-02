var router = require("express").Router();
var ClientController = require("../../controllers/client");
const { RequireSigninUser } = require("../../middlewares/userAuth");
const {
  addClientValidation
//   addContractorRateValidation,
//   addContractorValidation_1,
//   addContractorValidation_2,
//   addContractorValidation_3,
//   addContractorValidation_4,
} = require("../../Validator");

router.get("/all", RequireSigninUser, ClientController.getAllClients);
router.post(
  "/add",
  addClientValidation,
  RequireSigninUser,
  ClientController.addClient
);
