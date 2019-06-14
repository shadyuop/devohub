const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Empty name turns to empty string for validator to work
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid';

  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}