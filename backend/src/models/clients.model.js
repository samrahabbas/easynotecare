const mongoose = require("mongoose");

const ClientsSchema = mongoose.Schema({
    formID: {
        type: String,
        required: true
    },
    company_code: {
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
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    socialSecurityNumber: {
        type: String,
        required: true
    },
    race: {
        type: String,
        default: 'Unknown'
    },
    medicaidNumber: {
        type: String,
        default: ''
    },
    birthDate: {
        type: String,
        default: ''
    },
    enteredDate: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    enteredBy: {
        type: String,
        default: ''
    },
    admittedBy: {
        type: String,
        default: ''
    },
    lastUpdatedBy: {
        type: String,
        default: ''
    },
    admissionDate: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    ethnicity: {
        type: String,
        default: 'Unable to determine'
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    residentialAddr: {
        type: Boolean,
        default: false
    },
    mailingAddr: {
        type: Boolean,
        default: false
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
    clientdetails: {
        type: Object,
        default: {
            photo2Date: '',
            hairColor: '',
            eyeColor: '',
            interpreterNeeded: '',
            primaryOralLang: '',
            primaryWrittenLang: '',
            religion: '',
            citizenship: '',
            citizenshipStatus: '',
            maritialStatus: '',
            maritialStatusDate: '',
            dischargeDate: '',
            deathDate: '',
            clientTimezone: '',
            livingArrangement: '',
            birthPlace: '',
            characteristics: '',
            guardianOfSelf: '',
            developDisability: '',
            intellDisability: '',
            bloodType: '',
            primaryPhysician: '',
            othermedicalInfo: '',
            emergencyOrders: '',
            adaptiveEquipment: '',
            behaviorManagement: '',
            dietaryGuideline: '',
            eatingGuideline: '',
            commModality: '',
            commModalityOther: '',
            commComments: '',
            mobility: '',
            mobilityComments: '',
            supervision: '',
            supervisionComments: '',
            foodTexture: '',
            liquidConsistency: '',
            toiletingStatus: '',
            bathingStatus: '',
            mealTimeStatus: '',
            referralSource: '',
        }
    },
    insuranceInfo: {
        type: Object,
        default: {
            medicareNumber: '',
            medicareDate: '',
            medPlanDId: '',
            medPlanDName: '',
            medPlanDIssuer: '',
            medPlanDRxBin: '',
            medPlanDRxPcn: '',
            medPlanDRxGrp: '',
            otherBenefits: '',
            insuranceCompany: '',
            insuranceGroup: '',
            insurancePolicyNumber: '',
            insurancePolicyHolder: '',
            files: ''
        }
    },
})

const Clients = mongoose.model('clients', ClientsSchema);

module.exports = Clients;