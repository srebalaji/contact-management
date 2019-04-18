const express = require('express')
const responseHandler = require('../response-handler')
const {
  contactService,
} = require('../services/index')

const router = express.Router()

// List all contacts
router.get('/', responseHandler((req, res) => contactService.list(req, res)))

// create new contact
router.post('/', responseHandler((req, res) => contactService.create(req, res)))

// Update contact
router.put('/:id', responseHandler((req, res) => contactService.update(req, res)))

// Delete contact
router.delete('/:id', responseHandler((req, res) => contactService.deleteContact(req, res)))

module.exports = router
