const Clients = require("../models/clients.model");
const agencDocumentService = require("../services/agency_document");
const fs = require("fs");

exports.getAgencyDocuments = async (req, res, next) => {
  try {
    const { query } = req;
    let searchQuery = {
      isDeleted: false,
      company_code:req.user.company_code
    };
    if (query.enteredBy) {
      searchQuery.enteredBy = query.enteredBy;
    }

    if (query.name) {
      searchQuery.name = query.name;
    }

    if (query.type) {
      searchQuery.type = query.type;
    }
    if (query.recievedDateFrom) {
      searchQuery.receivedDate = {
        $gte: new Date(query.recievedDateFrom),
        // $lt: ISODate("2020-05-01")
      };
    }
    if (query.recievedDateTo) {
      searchQuery.receivedDate = {
        ...searchQuery.receivedDate,
        $lt: new Date(query.recievedDateTo),
      };
    }

    if (query.uploadDateFrom) {
      searchQuery.createdAt = {
        $gte: new Date(query.uploadDateFrom),
        // $lt: ISODate("2020-05-01")
      };
    }
    if (query.uploadDateTo) {
      searchQuery.createdAt = {
        ...searchQuery.uploadDateTo,
        $lt: new Date(query.recievedDateTo),
      };
    }

    if (query._id) {
      searchQuery = { _id: query._id };
    }

    const documents = await agencDocumentService.getAgencyDocuments(
      searchQuery,
      query.perPage
    );
    const total = await agencDocumentService.countAgencyDocuments(searchQuery);
    return res.status(200).json({
      message: "Documents Fetched",
      success: true,
      documents,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.addDocument = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.type) return next({ message: "Type required", status: 422 });
    if (!body.receivedDate)
      return next({ message: "Received Date required", status: 422 });

    const databody = {
      ...body,
      path: req?.file?.path || "",
      name: body.name || req?.file?.originalname || "",
      mimetype: req?.file?.mimetype || "",
      enteredBy: req.user._id,
      company_code: req.user.company_code,
    };
    const agencDocument = agencDocumentService.newAgencyDocument(databody);
    await agencDocument.save();
    return res.status(200).json({
      message: "Document Added",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.downloadFile = async (req, res, next) => {
  try {
    const documents = await agencDocumentService.getAgencyDocument({
      _id: req.params.id,
      company_code: req.user.company_code,
    });
    if (!documents)
      return res.status(404).json({
        message: "Document Not Found",
        success: false,
        status: 404,
      });

    const fileName = documents.name;
    const fileURL = documents.path;
    const stream = fs.createReadStream(fileURL);
    res.set({
      "Content-Disposition": `attachment; filename='${fileName}'`,
      "Content-Type": documents.mimetype,
    });
    stream.pipe(res);
  } catch (error) {
    return next(error);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await agencDocumentService.updateDocument(
      {
        _id: req.params.id,
        company_code: req.user.company_code,
      },
      {
        $set: {
          deletedAt: Date.now(),
          deletedBy: req.user._id,
          isDeleted: true,
        },
      }
    );
    if (!document)
      return res.status(404).json({
        message: "Document Not Found",
        success: false,
        status: 404,
      });
    return res.status(200).json({
      message: "Document Deleted",
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
// exports.deleteClient = (req, res) => {
//   Clients.deleteOne({ formID: req.body.deleteID })
//     .then(res.send("Client Has Been Deleted"))
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json({ noclientdeleted: "No client has been deleted" });
//     });
// };
