const multer = require("multer");
var path = require("path");
const fs = require("fs");

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

// const allowedExtensions = [
//   ".png",
//   ".jpg",
//   ".jpeg",
//   ".svg",
//   ".bmp",
//   ".pdf",
//   ".psd",
//   ".ai",
//   ".xd",
//   ".doc",
//   ".docx",
//   ".xls",
//   ".xlsx",
//   ".xlsm",
//   ".xltx",
//   ".ppt",
//   ".pptm",
//   ".pptx",
//   ".vsd",
//   ".vsdx",
//   ".vdx",
//   ".csv",
// ];
const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".pdf",
  ".doc",
  ".docx",
];
const allowedImage = [
  ".png",
  ".jpg",
  ".jpeg",
  // ".svg",
];

exports.local = (value) =>
  multer({
    limits: {
      // 50mb
      fieldSize: 50 * 1024 * 1024,
    },
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (!allowedExtensions.includes(ext.toLocaleLowerCase())) {
        return callback(new Error("File type not supported"));
      }
      //   switch (value) {
      //     case "job":
      //       if (!allowedExtensions.includes(ext.toLocaleLowerCase())) {
      //         return callback(new Error("File type not supported"));
      //       }
      //       break;
      //     case "whiteboard":
      //       if (!allowedImage.includes(ext.toLocaleLowerCase())) {
      //         return callback(new Error("File type not supported"));
      //       }
      //       break;
      //       case "material":
      //         if (!allowedImage.includes(ext.toLocaleLowerCase())) {
      //           return callback(new Error("File type not supported"));
      //         }
      //         break;

      //     case "quoteSignedPDF":
      //       if (![".pdf"].includes(ext.toLocaleLowerCase())) {
      //         return callback(new Error("File type not supported"));
      //       }
      //       break;
      //     default:
      //       break;
      //   }
      callback(null, true);
    },
    storage: multer.diskStorage({
      destination: async function (req, file, cb) {
        // const targetDirectoryPath = `/uploads/${value}`;
        
        // let validationResult;
        // switch (value) {
        //   case "app/pet":
        //     path = `${req.user._id}/pet`;
        //     if (!file) cb({ status: 422, msg: "photo must required" });
        //     validationResult = await PetValidator2(req.body);
        //     if (validationResult) {
        //       return cb({ status: 422, msg: validationResult });
        //     }
        //     break;
        // }
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        let uniqueId = uid(10);
        cb(null, value + "/" + uniqueId + "." + file.mimetype.split("/")[1]);
      },
    }),
  });
