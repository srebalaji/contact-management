const express = require('express')
const responseHandler = require('../response-handler')
const {
  contactGroupService,
} = require('../services/index')

const router = express.Router()

router.get('/', responseHandler((req, res) => contactGroupService.list(req, res)))


module.exports = router
