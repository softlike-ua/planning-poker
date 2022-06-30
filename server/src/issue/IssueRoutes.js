const express = require('express')
const router = express.Router()
const IssuesController = require('./IssueController')

router.get('/', IssuesController.getAll)


module.exports = router