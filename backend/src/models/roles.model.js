const mongoose = require("mongoose");

//Create Schema for Role
const RoleSchema = mongoose.Schema({
    roleName: {
        type: String,
        required: true
    },
    userManagement: {
        type: Object,
        required: true
    },
    disputesManagement: {
        type: Object,
        required: true
    },
    contentManagement: {
        type: Object,
        required: true
    },
    financialManagement: {
        type: Object,
        required: true
    },
    reporting: {
        type: Object,
        required: true
    },
    payroll: {
        type: Object,
        required: true
    },
    apiControls: {
        type: Object,
        required: true
    },
    databaseManagement: {
        type: Object,
        required: true
    },
    repositoryManagement: {
        type: Object,
        required: true
    },
    register_date: {
      type: Date,
      default: Date.now
    }
})

const Role = mongoose.model('roles', RoleSchema);

module.exports = Role;