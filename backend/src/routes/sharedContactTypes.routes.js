const express = require('express');
const { getContacts, createContact, updateContact, deleteContact } = require("../controllers/sharedContactTypes.controller")
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const SharedContactTypesRouter = express.Router();

SharedContactTypesRouter.route("/get/:id").get(isLogedIn, getContacts);

SharedContactTypesRouter.route("/create").post(isLogedIn, createContact);

SharedContactTypesRouter.route("/delete/:id").delete(isLogedIn, deleteContact);

module.exports = SharedContactTypesRouter;