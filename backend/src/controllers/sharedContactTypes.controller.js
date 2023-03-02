const SharedContactsType = require("../models/sharedContactTypes.model");

const getContacts = (req, res) => {
    let id = req.params.id;
    if (id) {
        SharedContactsType.find({ company_code: id },
            { _id: 0, __v: 0 })
            .then(contacts => {
                let result = contacts
                SharedContactsType.find({ company_code: '' }, { _id: 0, __v: 0 })
                    .then(contacts => {
                        result = result.concat(contacts)
                        res.json(result)
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({ message: "No shared contacts found" })
            })
    }
}

const createContact = (req, res) => {
    SharedContactsType.insertMany(req.body)
        .then(() => res.send("New Shared Contact Created"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No shared contacts has been created" })
        })
}

const deleteContact = (req, res) => {
    SharedContactsType.deleteOne(
        { formID: req.params.id }
    ).then(res.send("Shared Contact Deleted"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No shared contacts has been deleted" })
        })
}

module.exports = { getContacts, createContact, deleteContact }