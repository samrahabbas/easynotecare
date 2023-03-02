const Clients = require('../models/clients.model');

const getClients = (req, res) => {
    let id = req.params.id;
    if (id) {
        Clients.find({ company_code: id }, { _id: 0, __v: 0 })
            .then(clients => {
                res.json(clients)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({ message: "No Client Found" })
            })
    } else {
        res.status(404).json({ message: "No Client Found" })
    }
}

const createClient = (req, res) => {
    Clients.insertMany(req.body)
        .then(() => res.send("NEW CLIENT HAS BEEN CREATED"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No client has been inserted' })
        })
}

const updateClient = (req, res) => {
    Clients.updateOne(
        { formID: req.body.formID },
        {
            $set: req.body
        }).then(res.send("Updated Client Sucessfully"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No client has been updated' })
        })
}

const deleteClient = (req, res) => {
    Clients.deleteOne(
        { formID: req.body.deleteID }
    ).then(res.send("Client Has Been Deleted"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No client has been deleted" })
        })
}

module.exports = { getClients, createClient, updateClient, deleteClient }