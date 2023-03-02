const SharedContacts = require("../models/sharedContacts.model.js")

const getContacts = (req, res) => {
    let id = req.params.id;
    if (id) {
        SharedContacts.find({}, { _id: 0, __v: 0 })
            .then(contacts => {
                res.json(contacts)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({ message: "No shared contacts found" })
            })
    }
}

const createContact = (req, res) => {
    SharedContacts.insertMany(req.body)
        .then(() => res.send("New Shared Contact Created"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No shared contacts has been created" })
        })
}

const updateContact = (req, res) => {
    SharedContacts.updateOne(
        { formID: req.body.formID },
        {
            $set: req.body
        }).then(res.send("Shared Contact Updated"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No shared contacts has been updated" })
        })
}

const addclients = (req, res) => {
    let id = req.params.id;
    if (id) {
        for (let i = 0; i < req.body.length; i++) {
            SharedContacts.updateOne(
                { formID: req.body[i] },
                {
                    $push: { individualsAdded: id }
                }
            )
        }
        res.send("Client Added")
    }
}

const addSingleClient = (req, res) => {
    let id = req.params.id;
    if (id) {
        SharedContacts.updateOne(
            { formID: req.body.formID },
            {
                $push: { individualsAdded: id }
            }
        )
            .then(() => {
                res.send("Client Added")
            })
    }
}

const removeClient = (req, res) => {
    let id = req.params.id;
    if (id) {
        SharedContacts.updateOne(
            { formID: req.body.deleteSharedContact },
            {
                $pull: { individualsAdded: id }
            }
        )
            .then(() => {
                res.send("Client Removed")
            })

    }
}

const deleteContact = (req, res) => {
    SharedContacts.deleteOne(
        { formID: req.params.id }
    ).then(res.send("Shared Contact Deleted"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No shared contacts has been deleted" })
        })
}

module.exports = { getContacts, createContact, updateContact, deleteContact, addclients, addSingleClient, removeClient };