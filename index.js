const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config()

//Connect to DB
const mongoose = require('mongoose')
try {
  mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to the DB!')
  )
} catch (e) {
  console.log('Unable to connect to the DB', e)
}

// Route Middleware
const middleware = require('./app/middleware/middleware')
middleware(app)

app.listen(process.env.PORT || 3000, () => {
  console.log('Server up an running')
})

// Import Routes
const authRoute = require('./app/routes/auth')
app.use(process.env.BASE_URL || '/api/auth', authRoute)