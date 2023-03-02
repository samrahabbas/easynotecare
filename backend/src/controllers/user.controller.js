const User = require("../models/users.model.js");
const UserService = require("../services/users.service");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken");

exports.getUsersNameList = async (req, res, next) => {
  try {
    const users = await UserService.getUsersNames({
      company_code: req.user.company_code,
    });
    return res.status(200).json({
      message: "Users Name List Fetched",
      success: true,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUsers = (req, res) => {
  // res.status(200).json({
  //     data: "you got access to the private data in this route"
  // })

  User.find(
    { company_code: req.user.company_code },
    { password: 0, __v: 0, }
  )
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ noproductsfound: `No user found` }));
};

exports.addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !lastName || !email || !password || !role)
      return res
        .status(400)
        .json({ message: "All Feilds Are Required", success: false });

    // working on this file
    const userExist = await UserService.getUserSimply({ email });
    if (userExist)
      return res
        .status(400)
        .json({ message: "User Already Exists!", success: false });

    // const userRole = await User.findOne({ role:"sudoAdmin" });
    // if(userRole !== null){
    // if(req.body.role === userRole.role && userRole.role === "sudoAdmin" && req.body.role === "sudoAdmin") return res.status(400).json({ message: "Sudo can only register Once" })

    const hashedpwd = await bcrypt.hash(password, 10);

    const user = await UserService.newUser({
      firstName,
      lastName,
      email,
      password: hashedpwd,
      role,
      company_code: req.user.company_code,
    });
    await user.save();
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedpwd,
      role: user.role,
      token: generateToken(user._id),
      success: true,
      message: "User Added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.editUser = (req, res) => {
  User.updateOne(
    { _id: req.body._id },
    {
      $set: {
        firstName: req.body["firstName"],
        lastName: req.body["lastName"],
        email: req.body["email"],
        role: req.body["role"],
      },
    }
  )
    .then(res.send("Updated User Sucessfully"))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ nouserupdater: "No user updated" });
    });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.body.deleteID })
    .then(res.send("User has been deleted"))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ nouserdeleted: "No user deleted" });
    });
};

// module.exports = { getUsers, editUser, deleteUser }
