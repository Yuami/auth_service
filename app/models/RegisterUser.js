const User = require('./User')
const Joi = require('@hapi/joi')

class RegisterUser extends User {

  validation_schema = {
    name: Joi.string().min(5).alphanum(),
    email: Joi.string().min(3).max(320).required().email(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password')
  }
}

module.exports = RegisterUser