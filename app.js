const express = require('express')
// const bodyParser = require('body-parser')

const routes = require('./routes/routes.js')
// const logger = require('morgan')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.use(routes)
app.use(logger('dev'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  // If you pass an error to next() and you do not handle it in an error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace.
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
