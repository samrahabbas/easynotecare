const mongoose = require('mongoose');

const ProgramsSchema = new mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    company_code: {
        type: String,
        required: true
    },
    programName: {
        type: String,
        required: true
    },
    programType: {
        type: String,
        required: true
    },
    siteAddress: {
        type: String,
        required: true
    },
    siteName: {
        type: String,
        required: true
    },
    individualsAdded: {
        type: Array,
        default: []
    },
    programCostCenterNumber: {
        type: Number,
        default: ''
    },
    createDate: {
        type: String,
        default: ''
    }
});

const Programs = mongoose.model('programs', ProgramsSchema);

module.exports = Programs;