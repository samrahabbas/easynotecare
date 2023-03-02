const Role = require("../models/roles.model");


const getRoles = (req, res) => {

    Role.find({})
        .then(role => res.json(role))
        .catch(err => res.status(404).json({ norolesfound: `No role found` }));

}

const addRole = (req, res) => {
    Role.insertMany(req.body)
        .then(role => res.send("Added New Role Successfully"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ noroleinserter: `No role inserted` })
        })
}

const updateRole = (req, res) => {
    Role.updateOne(
        { roleName: req.body.roleName },
        {
            $set: {
                "userManagement": req.body["userManagement"],
                "disputesManagement": req.body["disputesManagement"],
                "contentManagement": req.body["contentManagement"],
                "financialManagement": req.body["financialManagement"],
                "reporting": req.body["reporting"],
                "payroll": req.body["payroll"],
                "apiControls": req.body["apiControls"],
                "databaseManagement": req.body["databaseManagement"],
                "repositoryManagement": req.body["repositoryManagement"],
            }
        }
    ).then(res.send("Updated Role Sucessfully"))
    .catch(() => {
        console.log(err)
        res.status(404).json({ noroleupdater: `No role updated` })
    })
}

module.exports = { getRoles, addRole, updateRole }
