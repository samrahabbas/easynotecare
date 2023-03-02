const mongoose = require('mongoose');

//Create Shcema for Shared Contacts Types
const SharedContactsTypeSchema = new mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company_code: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const SharedContactsType = mongoose.model('sharedcontacttype', SharedContactsTypeSchema);

module.exports = SharedContactsType;