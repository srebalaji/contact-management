const express = require('express')
const responseHandler = require('../response-handler')
const {
  contactGroupService,
} = require('../services/index')

const router = express.Router()

// List all groups
router.get('/', responseHandler((req, res) => contactGroupService.list(req, res)))

// Create group
router.post('/', responseHandler((req, res) => contactGroupService.create(req, res)))

// Update group
router.put('/:id', responseHandler((req, res) => contactGroupService.update(req, res)))

// Delete group
router.delete('/:id', responseHandler((req, res) => contactGroupService.deleteGroup(req, res)))

module.exports = router
