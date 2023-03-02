const moment = require("moment");
const validator = require("validator");


exports.addClientValidation = async (req, res, next) => {
    try {
      const { body } = req;
      if (!validator.isEmail(body.email || ""))
        return next({ message: "Invalid Email", status: 422 });
  
      // if (validator.isEmpty(body.password || ""))
      //   return next({ message: "Password required", status: 422 });
  
      if (validator.isEmpty(body.name || ""))
        return next({ message: "Name required", status: 422 });
  
      if (validator.isEmpty(body.gender || ""))
        return next({ message: "gender required", status: 422 });
  
      if (isValidId(body.gender))
        return next({ status: 422, message: "invalid gender id" });
  
      if (validator.isEmpty(body.address || ""))
        return next({ message: "address required", status: 422 });
  
      if (validator.isEmpty(body.Admission_Type || ""))
        return next({ message: "Admission_Type required", status: 422 });
  
      if (validator.isEmpty(body.status || ""))
        return next({ message: "status required", status: 422 });
  
      if (validator.isEmpty(body.Client_Type || ""))
        return next({ message: "Client_Type required", status: 422 });
  
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
  