const ICD9 = require("../models/icd9.model.js");

const searchICD = (req, res) => {
    let tempstr = req.body.value;

    ICD9.find({ info: { $regex: tempstr, '$options': 'i' } }).limit(8)
        .then(icd => {
            res.json(icd)
        })
        .catch(err => res.status(404).json({ noicdfound: "No ICD 9 Record Found" }))

}

module.exports = {searchICD}