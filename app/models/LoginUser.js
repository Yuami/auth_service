const User = require('./User')
const Joi = require('@hapi/joi')

class LoginUser extends User {

  validation_schema = {
    email: Joi.string().min(3).max(320).required().email(),
    password: Joi.string().min(8).required(),
  }
}

module.exports = LoginUser