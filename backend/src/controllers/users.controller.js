const Users = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({});

const registerUser = async (req, res) => {
  // users
  const { email, password, firstName, lastName, register_date } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return res.json({ message: "Couldn't create user" });
      }
      const user = {
        // id: users.length + 1,
        email,
        password: hash,
        firstName,
        lastName,
        register_date,
        company_code: uid(4),
        // nned to change
        role: "sudoAdmin",
      };
      Users.insertMany(user)
        .then(() => {
          return res.json({ message: "User created successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ message: "Couldn't create user" });
        });
    });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email }).then((user) => {
    if (user.length === 0) {
      return res.json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return res.json({ message: "Wrong password" });
        }

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
            company_code: user.company_code,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1day",
          }
        );

        return res.json({
          message: "Login successful",
          token,
        });
      });
    }
  });
};

const protected = async (req, res, next) => {
  try {
    const token = String(req?.headers?.authorization?.replace("Bearer ", ""));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    Users.findOne(
      { email: decoded.email },
      { password: 0, _id: 0, __v: 0 }
    ).then((user) => {
      if (user) {
        return res.status(200).send({ authenticated: true, user: user });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { registerUser, loginUser, protected };
