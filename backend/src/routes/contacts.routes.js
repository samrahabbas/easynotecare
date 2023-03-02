const express = require("express");
const { getContacts, deleteContact, updateContact, addContact } = require('../controllers/contacts.controller');
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const contactRouter = express.Router();

contactRouter.route("/get").get(isLogedIn, getContacts);

contactRouter.route("/delete").delete(isLogedIn, deleteContact);

contactRouter.route("/update").put(isLogedIn, updateContact);

contactRouter.route("/create").post(isLogedIn, addContact)

module.exports = contactRouter;