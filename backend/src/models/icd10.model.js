const mongoose = require("mongoose");

const ICD10Schema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    }
})

const ICD10 = mongoose.model('icd10', ICD10Schema);

module.exports = ICD10;