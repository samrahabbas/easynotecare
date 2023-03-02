const Health = require("../models/health.model");

const getHealth = (req, res) => {
    Health.find(
        { clientID: req.params.id },
        { _id: 0, __v: 0 })
        .then(health => {
            res.json(health);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "No record found" });
        })
}

const createHealth = (req, res) => {
    Health.insertMany(req.body)
        .then(() => res.send("NEW CLIENT HEALTH INFO CREATED"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "No record created" });
        })
}

const addDiagnostics = (req, res) => {
    Health.findOne({ clientID: req.body.clientID })
        .then(health => {
            if (health) {
                Health.updateOne(
                    { clientID: req.body.clientID },
                    {
                        $push: {
                            diagnosticsInfo: req.body.diagnosticsInfo
                        }
                    }
                )
                    .then(() => res.send("DIAGNOSIS UPDATED"))
                    .catch(err => {
                        console.log(err)
                        res.status(404).json({ message: "No record updated" });
                    })
            } else {
                Health.insertMany(req.body)
                    .then(() => res.send("DIAGNOSIS INFO CREATED"))
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const deleteDiagnosis = (req, res) => {
    Health.updateOne({ clientID: req.body.clientID },
        {
            $pull: { "diagnosticsInfo": { "formID": req.body.deleteID } }
        })
        .then(() => res.send("Allergy deleted"))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const addAllergy = (req, res) => {
    Health.findOne({ clientID: req.body.clientID })
        .then(health => {
            if (health) {
                Health.updateOne(
                    { clientID: req.body.clientID },
                    {
                        $push: {
                            allergyInfo: req.body.allergyInfo
                        }
                    }
                )
                    .then(() => res.send("ALLERGIES UPDATED"))
                    .catch(err => {
                        console.log(err)
                        res.status(404).json({ message: "No record updated" });
                    })
            } else {
                Health.insertMany(req.body)
                    .then(() => res.send("ALLERGIES INFO CREATED"))
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const deleteAllergy = (req, res) => {
    Health.updateOne({ clientID: req.body.clientID },
        {
            $pull: { "allergyInfo": { "formID": req.body.deleteID } }
        })
        .then(() => res.send("Allergy deleted"))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const updateAllergy = (req, res) => {
    Health.findOne({ clientID: req.body.clientID })
        .then(health => {
            if (health) {
                Health.updateOne({
                    clientID: req.body.clientID, "allergyInfo.formID": req.body.allergyInfo.formID
                }, {
                    $set: {
                        "allergyInfo.$": req.body.allergyInfo
                    }
                })
                    .then(() => res.send("ALLERGY UPDATED"))
                    .catch(err => {
                        console.log(err)
                        res.status(404).json({ message: "No record updated" });
                    })
            } else {
                res.status(404).json({ message: "No record found" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const updateDiagnosis = (req, res) => {
    Health.findOne({ clientID: req.body.clientID })
        .then(health => {
            if (health) {
                Health.updateOne({
                    clientID: req.body.clientID, "diagnosticsInfo.formID": req.body.diagnosticsInfo.formID
                }, {
                    $set: {
                        "diagnosticsInfo.$": req.body.diagnosticsInfo
                    }
                })
                    .then(() => res.send("DIAGNOSIS UPDATED"))
                    .catch(err => {
                        console.log(err)
                        res.status(404).json({ message: "No record updated" });
                    })
            } else {
                res.status(404).json({ message: "No record found" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

const healthDetails = (req, res) => {
    Health.findOne({ clientID: req.body.clientID })
        .then(health => {
            if (health) {
                Health.updateOne({ clientID: req.body.clientID },
                    {
                        $set: {
                            "healthInfo": req.body.healthInfo
                        }
                    })
                    .then(() => res.send("DIAGNOSIS UPDATED"))
                    .catch(err => {
                        console.log(err)
                        res.status(404).json({ message: "No record updated" });
                    })
            } else {
                res.status(404).json({ message: "No record found" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Server error" });
        });
}

module.exports = {
    getHealth, createHealth, addAllergy, updateAllergy, updateDiagnosis,
    addDiagnostics, deleteAllergy, deleteDiagnosis, healthDetails
};