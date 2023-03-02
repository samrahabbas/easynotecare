const Users = require("../models/users.model");

class usersService {
  newUser(data) {
    return new Users(data);
  }
  getUsersNames(req = {}) {
    // return Users.find(req).select("firstName lastName email")
    return Users.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          full_name: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
          _id: 1,
        },
      },
    ]);
  }
  getUserSimply(req = {}) {
    return Users.findOne(req);
  }
  countUsers(req = {}) {
    return Users.countDocuments(req);
  }
}
module.exports = new usersService();
