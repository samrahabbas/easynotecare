const express = require("express");
const {
  getUsers,
  editUser,
  deleteUser,
  getUsersNameList,
  addUser,
} = require("../controllers/user.controller.js");
const { protect, isLogedIn } = require("../middlewares/authMiddleware.js");
// const {protectRole}  = require("../middlewares/roleMiddleware.js");

const userRouter = express.Router();

// userRouter.route("/users").get( ()=>(protectRole(["sudoAdmin","superAdmin"])), getUsers);

// userRouter.route("/users").get(protect, getUsers);
userRouter.post("/add", isLogedIn, addUser);
userRouter.get("/nameList", isLogedIn, getUsersNameList);

userRouter.get("/users", isLogedIn, getUsers);

userRouter.route("/editUser").put(editUser);

userRouter.route("/deleteUser").delete(deleteUser);

module.exports = userRouter;
