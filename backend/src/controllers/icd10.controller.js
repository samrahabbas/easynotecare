const ICD10 = require("../models/icd10.model.js");

const searchICD = (req, res) => {
    let tempstr = req.body.value

    ICD10.find({ info: { $regex: tempstr, '$options': 'i' } }).limit(8)
        .then(icd => {
            // console.log(icd)
            res.json(icd)
        })
        .catch(err => res.status(404).json({ noicdfound: "No ICD 10 Record Found" }))

}

module.exports = { searchICD }