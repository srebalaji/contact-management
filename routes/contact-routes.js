const express = require('express')
const responseHandler = require('../response-handler')
const {
  contactService,
} = require('../services/index')

const router = express.Router()

// create new contact
router.post('/', responseHandler((req, res) => contactService.create(req, res)))

module.exports = router
