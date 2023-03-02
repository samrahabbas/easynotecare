const mongoose = require('mongoose');

//Create Schema For Shared Contacts
const SharedContactsSchema = mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    organizationName: {
        type: String,
        default: ""
    },
    npiNumber: {
        type: String,
        default: ""
    },
    speciality: {
        type: String,
        default: ""
    },
    residentialAddr: {
        type: Boolean,
        default: false
    },
    mailingAddr: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        default: ''
    },
    individualsAdded: {
        type: Array,
        default: []
    },
    company_code: {
        type: String,
        required: true
    },
    individualsAdded:{
        type: Array,
        default: []
    },
    addrInfo: {
        type: Object,
        default: {
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
            country: '',
            st1: '',
            st2: '',
            city: '',
            state: '',
            zipCode: ''
        }
    },
    mailingInfo: {
        type: Object,
        default: {
            st1: '',
            st2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
        }
    }
})

const SharedContacts = mongoose.model('sharedcontacts', SharedContactsSchema);

module.exports = SharedContacts;