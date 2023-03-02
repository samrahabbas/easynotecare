const express = require("express");
const  { getRoles, addRole, updateRole } = require("../controllers/roles.controller");
const { protect } = require("../middlewares/authMiddleware");

const roleRouter = express.Router();

roleRouter.route("/getRoles").get(getRoles)

roleRouter.route("/addRole").post(addRole)

roleRouter.route("/updateRole").put(updateRole)

module.exports = roleRouter