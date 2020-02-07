const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {

    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.uid = !isEmpty(data.uid) ? data.uid : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.balance = !isEmpty(data.balance) ? data.balance : "";
    
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    
    // UID checks
    if (Validator.isEmpty(data.uid)) {
        errors.uid = "UID field is required";
    } 
    
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.balance)) {
        errors.balance = "Balance field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};