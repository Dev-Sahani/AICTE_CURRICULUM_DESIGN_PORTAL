const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')

router.route('/:id')
    .get(subjectController.getSubjectById)
router.route('/for-user').post(subjectController.getSubjectForUser)
module.exports = router