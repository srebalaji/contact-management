const express = require('express')

const Contact = require('../models/contact')
const responseHandler = require('../response-handler')

const router = express.Router()

router.get('/', responseHandler(() => ({
  project: 'Contact management',
  author: 'Srebalaji',
})))


// Handle 404
router.all('*', (req, res) => res.status(404).send({
  success: false,
  error: 'No routes present',
}))

module.exports = router
