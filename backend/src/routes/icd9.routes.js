const express = require("express");
const { searchICD } = require("../controllers/icd9.controller");
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/findICD").post(isLogedIn, searchICD);

module.exports = router;