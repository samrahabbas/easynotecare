const validator = require("validator");
exports.addDocumentValidation = async (req, res, next) => {
  try {
    const { body } = req;
    if (!validator.isEmail(body.email || ""))
      return next({ message: "Invalid Email", status: 422 });

    // if (validator.isEmpty(body.password || ""))
    //   return next({ message: "Password required", status: 422 });

    if (validator.isEmpty(body.first_name || ""))
      return next({ message: "first name required", status: 422 });

    if (validator.isEmpty(body.last_name || ""))
      return next({ message: "last name required", status: 422 });

    // if (validator.isEmpty(body.businessType || ""))
    //   return next({ message: "Business Type required", status: 422 });

    // if (isValidId(body.businessType))
    //   return next({ status: 422, message: "invalid businessType id" });

    // if (!(await isIdExist.businessTypeId(body.businessType)))
    //   return next({ status: 422, message: "Invalid businessType" });

    if (validator.isEmpty(body.delivery_address || ""))
      return next({ message: "Delivery Address required", status: 422 });

    // if (validator.isEmpty(body.city || ""))
    //   return next({ message: "City required", status: 422 });

    // if (validator.isEmpty(body.state || ""))
    //   return next({ message: "State required", status: 422 });

    // if (validator.isEmpty(body.zip_code || ""))
    //   return next({ message: "zip code required", status: 422 });

    // if (validator.isEmpty(body.fax || ""))
    //   return next({ message: "fax required", status: 422 });

    if (validator.isEmpty(body.phone_1 || ""))
      return next({ message: "phone_1 required", status: 422 });

    // if (validator.isEmpty(body.phone_2 || ""))
    //   return next({ message: "phone_2 required", status: 422 });

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
