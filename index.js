const express = require('express')
const app = express()

// Import Routes
const authRoute = require('./routes/auth')

// Route Middlewares
app.use(process.env.AUTH_PATH, authRoute)

app.listen(process.env.PORT, () => {
  console.log('Server up an running')
})