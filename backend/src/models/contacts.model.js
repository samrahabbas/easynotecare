const mongoose = require("mongoose");

//Create Schema for Contacts
const ContactsSchema = mongoose.Schema({
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
    individualID: {
        type: String,
        required: true
    },
    agency: {
        type: String,
        default: ''
    },
    comments: {
        type: String,
        default: ''
    },
    relaiontoind: {
        type: String,
        default: ''
    },
    isGuardian: {
        type: Boolean,
        default: false
    },
    isAddress: {
        type: Boolean,
        default: false
    },
    isMailing: {
        type: Boolean,
        default: false
    },
    guardianInfo: {
        type: Object,
        default: {
            guardianAuthority: '',
            guardianState: '',
            guardianEstablishDate: '',
            guardianEstablishEndDate: '',
            guardianType: ''
        }
    },
    addressInfo: {
        type: Object,
        default:  {
            st1: '',
            st2: '',
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
            faxNumber: '',
            email: '',
            webaddress: '',
            zipCode: '',
            country: '',
            state: '',
            city: '',
        }
    },
    mailingInfo: {
        type: Object,
        default:  {
            st1: '',
            st2: '',
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
            faxNumber: '',
            email: '',
            webaddress: '',
            zipCode: '',
            country: '',
            state: '',
            city: '',
        }
    },
})

const Contacts = mongoose.model('contacts', ContactsSchema);

module.exports = Contacts