const RegisterUser = require('../models/RegisterUser')
const LoginUser = require('../models/LoginUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hash = async (string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(string, salt)
}

const sendError = (res, message, status=400) => {
  return res.status(status).send({error: message})
}

const register = async (req, res) => {
  const user = new RegisterUser()
  const model = user.model()
  const {error, value} = user.validate(req.body)

  if (error)
    return sendError(res, error.message)

  const emailExist = await model.findOne({email: req.body.email})
  if (emailExist)
    return sendError(res, 'Unable to create user')

  value.password = await hash(value.password)
  try {
    const savedUser = await model(value).save()
    res.send({user: savedUser._id})
  } catch (e) {
    console.error(e)
    return sendError(res, 'Internal Server Error', 500)
  }
}


const login = async (req, res) => {
  const userModel = new LoginUser()
  const model = userModel.model()
  const {error, value} = userModel.validate(req.body)

  if (error)
    return sendError(res, error.message)

  const user = await model.findOne({email: req.body.email})
  if (!user)
    return sendError(res, 'Email or password is wrong')

  const validPass = await bcrypt.compare(value.password, user.password)
  if (!validPass)
    return sendError(res, 'Email or password is wrong')

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send({token})
}

module.exports = {register, login}