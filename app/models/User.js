const Model = require('./Model')

class User extends Model {

  modelName = 'User'

  schema = {
    name: { type: String, required: true, min: 5, max: 30 },
    email: { type: String, required: true, min: 3, max: 320 },
    password: { type: String, required: true, min: 8 },
  }

}

module.exports = User