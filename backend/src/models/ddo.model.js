const mongoose = require('mongoose');

const DDOSchema = mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    company_code:{ 
        type: String,
        required: true
    },
    outcomeMeasureType: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        default: ''
    },
    taskDomain: {
        type: Array,
        default: [],
        required: true
    },
    scoreLabel: {
        type: Array,
        default: [],
        required: true
    }
});

const DDO = mongoose.model('ddo', DDOSchema);

module.exports = DDO;