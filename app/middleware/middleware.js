const express = require('express')
const jwt = require('jsonwebtoken')

const middlewareDefaultList = [
  express.json
]

const exec = (app, middlewareList = middlewareDefaultList) => {
  middlewareList.forEach((middleware) => app.use(middleware()))
}

const auth = (req, res, next) => {
  const token = req.header(process.env.HEADER_TOKEN_NAME)
  if (!token)
    return res.status(401).send({error: 'Access Denied'})

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (e) {
    return res.status(401).send({error: 'Invalid token'})
  }
  next()
}

module.exports = {exec, auth}