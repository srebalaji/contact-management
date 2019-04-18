const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routers = require('./routes')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/', routers)

app.listen(port, () => console.log(` App listening on port ${port}!`))

mongoose.connect('mongodb://localhost:27017/contact-management', { useNewUrlParser: true })
  .then(() => {
    app.listen(4000)
  })
  .catch(e => console.log(e))
