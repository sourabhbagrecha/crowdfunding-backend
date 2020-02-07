const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProjectInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.uid = !isEmpty(data.uid) ? data.uid : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.picture = !isEmpty(data.picture) ? data.picture : "";

    // title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    // description checks
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    // image data validation
    if (Validator.isEmpty(data.picture)) {
        errors.picture = "picture field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};