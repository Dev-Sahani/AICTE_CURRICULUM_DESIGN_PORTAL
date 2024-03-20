const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')
const authController = require('../controllers/authController')

router.route('/')
    .get(authController.protect,
        subjectController.getAllSubjects)
    .post(authController.protect,
        subjectController.postSubject)
router.route('/:commonId')
    .get(authController.protect, subjectController.getSubjectById)
    
router.get("/:commonId/referenceMaterial", authController.protect, subjectController.getReferenceMaterial)
router.route('/for-user')
    .post(authController.protect,
        subjectController.getSubjectForUser)
router.patch('/update-by-user/:commonId',
    authController.protect, 
    subjectController.updateByUser)
router.patch('/accept-updates/:commonId',
    authController.protect, 
    subjectController.acceptUpdates)

module.exports = router