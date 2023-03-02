const express = require('express');
const { getContacts, createContact, updateContact,
    deleteContact, addSingleClient, addclients, removeClient } = require("../controllers/sharedContacts.controller")
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const SharedRouter = express.Router();

SharedRouter.route("/get/:id").get(isLogedIn, getContacts);

SharedRouter.route("/create").post(isLogedIn, createContact);

SharedRouter.route("/update").put(isLogedIn, updateContact);

SharedRouter.route("/addClient/:id").post(isLogedIn, addclients);

SharedRouter.route("/addSingleClient/:id").post(isLogedIn, addSingleClient);

SharedRouter.route("/deleteClient/:id").post(isLogedIn, removeClient);

SharedRouter.route("/delete/:id").delete(isLogedIn, deleteContact);

module.exports = SharedRouter;