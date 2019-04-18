const express = require('express')

const contactRouter = require('./contact-routes')
const contactGroupRouter = require('./contact-group-routes')
const responseHandler = require('../response-handler')

const router = express.Router()

// Root path
router.get('/', responseHandler(() => ({
  project: 'Contact management',
  author: 'Srebalaji',
})))

// Use Contacts routes
router.use('/contact', contactRouter)

// Use Contact groups routes
router.use('/group', contactGroupRouter)

// Handle 404
router.all('*', (req, res) => res.status(404).send({
  success: false,
  error: 'No routes present',
}))

module.exports = router
