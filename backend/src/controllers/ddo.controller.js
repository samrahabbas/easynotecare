const DDO = require("../models/ddo.model");

const getDDO = (req, res) => {
    let id = req.params.id;
    if (id) {
        DDO.findById({ company_code: id }, { _id, __v })
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json({ message: "DDO not found" });
            })
    }
}

const createDDO = (req, res) => {
    DDO.insertMany(req.body)
        .then(() => res.send("NEW DDO CREATED"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "DDO not created" });
        })
}

const updateDDO = (req, res) => {
    DDO.updateOne(
        { formID: req.params.id },
        {
            $set: req.body
        }).then(res.send("UPDATED DDO"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "DDO not updated" });
        })
}

const deleteDDO = (req, res) => {
    DDO.deleteOne(
        { formID: req.body.formID }
    ).then(res.send("DELETED DDO"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "DDO not deleted" });
        })
}

module.exports = { getDDO, createDDO, updateDDO, deleteDDO };