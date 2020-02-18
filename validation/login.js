const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.uid = !isEmpty(data.uid) ? data.uid : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.uid)) {
        throw new Error("User id is required!")
    } 

    // Password checks
    if (Validator.isEmpty(data.password)) {
        throw new Error("Password field is required")
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};