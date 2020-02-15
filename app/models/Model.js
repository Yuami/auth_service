const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

class Model {

  modelName = 'Model'
  collection = null
  skipInit = null
  schema = {}
  validation_schema = {}
  data = {}
  static models = {}

  constructor () {
    Object.keys(this.schema).forEach((key) => this.data[key] = null)
  }

  register () {
    this.schema.created_at = { type: Date, default: Date.now }
    this.schema.updated_at = { type: Date, default: Date.now }

    return Model.models[this.modelName] = mongoose.model(
      this.modelName,
      new mongoose.Schema(this.schema),
      this.collection,
      this.skipInit
    )
  }

  model () {
    const exists = Object.keys(Model.models).some((name) => name === this.modelName)
    if (exists)
      return Model.models[this.modelName]
    return this.register()
  }

  validate (data) {
    return this.data = Joi.object(this.validation_schema).validate(data)
  }
}

module.exports = Model

