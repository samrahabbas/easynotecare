const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res.status(401).json({ message: "Not Authorized to acces this route." })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        res.status(404).json({ message: "No user found with this id." })
      );
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(
      res.status(401).json({ message: "Not Authorized to acces this route." })
    );
  }

  // const authHeader = req.headers.authorization || req.headers.Authorization;
  // if (!authHeader) return res.sendStatus(401);
  // const token = authHeader;
  // if (token) return next();

  // const authHeader = req.headers.authorization || req.headers.Authorization;
  // if (!authHeader) return res.sendStatus(401);
  // const token = authHeader;
  //  jwt.verify(
  //       token,
  //        process.env.JWT_SECRET,
  //     (err, decoded) => {
  //         if (err) return res.sendStatus(403); //invalid token
  //         next();
  //     }
  //     );
};

exports.isLogedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not Authorized to acces this route.", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this id.", success: false });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not Authorized to acces this route.", success: false });
  }
};
