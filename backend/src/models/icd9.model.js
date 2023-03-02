const mongoose = require("mongoose");

const ICD9Schema = mongoose.Schema({
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

const ICD9 = mongoose.model('icd9', ICD9Schema);

module.exports = ICD9;