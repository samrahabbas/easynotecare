const Tlogs = require('../models/tlogs.model');

const getTlogs = (req, res) => {
    let id = req.params.id;
    if (id) {
        Tlogs.find({}, { _id: 0, __v: 0 })
            .then(tlogs => res.json(tlogs))
            .catch(err => {
                console.log(err);
                res.status(404).json({ message: 'No tlogs found' });
            })
    } else {
        res.status(404).json({ message: 'No tlogs found' });
    }
};

const createTlog = (req, res) => {
    Tlogs.insertMany(req.body)
        .then(() => res.send("NEW TLOG HAS BEEN CREATED"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'No tlogs has been inserted' });
        })
};

const updateTlog = (req, res) => {
    Tlogs.updateOne({ formID: req.body.formID },
        { $set: req.body }
    ).then(() => res.send("TLOG HAS BEEN UPDATED"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'No tlogs has been updated' });
        })
};

const deleteTlog = (req, res) => {
    Tlogs.deleteOne({ formID: req.body.deleteID })
        .then(() => res.send("TLOG HAS BEEN DELETED"))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: 'No tlog has been deleted' });
        })
};

module.exports = { getTlogs, createTlog, updateTlog, deleteTlog };