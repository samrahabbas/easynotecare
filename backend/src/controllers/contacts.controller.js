const Contacts = require('../models/contacts.model')

const getContacts = (req, res) => {
    Contacts.find({}, { _id: 0, __v: 0 })
        .then(contacts => res.json(contacts))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No contact found' })
        })
}

const deleteContact = (req, res) => {
    Contacts.deleteOne(
        { formID: req.body.deleteID }
    ).then(res.send("Contact has been deleted"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No contact has been deleted" })
        })
}

const updateContact = (req, res) => {
    Contacts.updateOne(
        { formID: req.body.formID },
        {
            $set: req.body
        }).then(res.send("Updated Contact Sucessfully"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No contact has been updated' })
        })

}

const addContact = (req, res) => {
    console.log(req.body)
    Contacts.insertMany(req.body)
        .then(() => res.send("Added new contact sucessfully"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No contact has been inserted' })
        })
}

module.exports = { getContacts, deleteContact, updateContact, addContact };