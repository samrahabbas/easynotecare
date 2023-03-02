const agencDocument = require("../models/agency.document.model");

class agencDocumentService {
  newAgencyDocument(data) {
    return new agencDocument(data);
  }
  getAgencyDocuments(req = {}, perPage, pageNo) {
    return (
      agencDocument
        .find(req)
        .populate("enteredBy", "firstName lastName")
        // .skip((pageNo - 1) * perPage)
        .limit(perPage)
    );
  }

  getAgencyDocument(req = {}, perPage, pageNo) {
    return agencDocument.findOne(req);
  }
  updateDocument(req, data) {
    return agencDocument.findOneAndUpdate(req, data, { new: true });
  }

  countAgencyDocuments(req = {}) {
    return agencDocument.countDocuments(req);
  }
}
module.exports = new agencDocumentService();
