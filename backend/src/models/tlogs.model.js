const mongoose = require('mongoose');

const TlogsSchema = mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    company_code:{
        type: String,
        required: true
    },
    clientID: {
        type: String,
        required: true
    },
    type: {
        type: Array,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    reportedOn: {
        type: String,
        default: Date.now
    },
    intensityLevel: {
        type: String,
        default: "Low",
    }
}, {
    timestamps: true
});

const Tlogs = mongoose.model('tlogs', TlogsSchema);

module.exports = Tlogs;