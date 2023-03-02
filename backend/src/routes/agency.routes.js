const express = require("express");
const cors = require("cors");
const {
  getAgencyDocuments,
  addDocument,
  downloadFile,
  deleteDocument,
} = require("../controllers/agency.controller");

const { protect, isLogedIn } = require("../middlewares/authMiddleware.js");
let { local } = require("../services/storage_local");
let Local = local("agency_document");

const Router = express.Router();

Router.post("/add_document", Local.single("document"), isLogedIn, addDocument);

Router.get("/documents", isLogedIn, getAgencyDocuments);
// :id is document id
Router.get(
  "/download/:id",
  isLogedIn,
  cors({
    exposedHeaders: ["Content-Disposition"],
  }),
  downloadFile
);

Router.delete("/document/:id", isLogedIn, deleteDocument);

// clientRouter.route("/update").put(updateClient);

module.exports = Router;
