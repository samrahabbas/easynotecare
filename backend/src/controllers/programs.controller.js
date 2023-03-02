const Programs = require('../models/programs.model');

const getPrograms = (req, res) => {
    let id = req.params.id;
    if (id) {
        Programs.find({ company_code: id }, { _id: 0, __v: 0 })
            .then(programs => {
                res.json(programs)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({ message: "No Program Found" })
            })
    }
}

const createProgram = (req, res) => {
    Programs.insertMany(req.body)
        .then(() => res.send("NEW PROGRAM HAS BEEN CREATED"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: 'No program has been inserted' })
        })
}

const updatePrograms = (req, res) => {
    req.body.forEach(data => {
        Programs.updateOne({ formID: data.formID }, { $set: { individualsAdded: data.individualsAdded } }, (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).json({ message: "No program has been updated." })
            };
        });
    });

    res.send({ message: 'Values updated successfully' });
}

const updateProgramClient = (req, res) => {
    Programs.updateOne(
        { formID: req.body.programID },
        {
            $push: { individualsAdded: req.body.clientID }
        })
        .then(() => res.send({ message: "Client added successfully" }))
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: "No program has been updated." })
        })
}

const updateProgram = (req, res) => {
    Programs.updateOne(
        { formID: req.body.formID },
        {
            $set: req.body
        })
        .then(res.send("PROGRAM HAS BEEN UPDATED"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No program has been updated" })
        })

}

const deleteProgram = (req, res) => {
    Programs.deleteOne(
        { formID: req.body.deleteID }
    ).then(res.send("Program Has Been Deleted"))
        .catch(err => {
            console.log(err)
            res.status(404).json({ message: "No program has been deleted" })
        })
}

module.exports = {
    getPrograms, createProgram, updatePrograms, deleteProgram,
    updateProgram, updateProgramClient
}