const mongoose = require("mongoose");

const HealthSchema = mongoose.Schema({
    clientID: {
        type: String,
        required: true
    },
    healthInfo: {
        type: Object,
        default: {
            heightFeet: '',
            heightInch: '',
            weightRangeFrom: '',
            weightRangeTo: '',
            temperatureFrom: '',
            temperatureTo: '',
            pulseFrom: '',
            pulseTo: '',
            oxygenSaturationFrom: '',
            oxygenSaturationTo: '',
            respirationFrom: '',
            respirationTo: '',
            bloodSystolicFrom: '',
            bloodSystolicTo: '',
            bloodDiastolicFrom: '',
            bloodDiastolicTo: '',
        }
    },
    allergyInfo: {
        type: [{
            formID: "",
            allergy: "",
            codeType: "",
            code: "",
            allergyState: "",
            description: "",
            type: "",
            severity: "",
            identificationDate: "",
            reaction: "",
            diagnosedBy: ""
        }],
        default: []
    },
    diagnosticsInfo: {
        type: [{
            formID: "",
            diagnosisCodeType: "",
            diagnosisName: "",
            description: "",
            diagnosisDate: '',
            diagnosedBy: "",
            enteredBy: "",
        }],
        default: []
    }
},
    {
        timestamps: true,
    }
)

const Health = mongoose.model("health", HealthSchema);

module.exports = Health;