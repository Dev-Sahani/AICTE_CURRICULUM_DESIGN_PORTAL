const express = require('express')
const router = express.Router()

const subjectController = require('../controllers/subjectController')
const authController = require('../controllers/authController')

router.route('/')
    .get(
        authController.protect,
        subjectController.getAllSubjects
    )
    .post(
        authController.protect,
        subjectController.protectByRole("edit"), 
        subjectController.postSubject
    );

router.route('/:commonId')
    .get(
        authController.protect, 
        subjectController.protectByRole("view"), 
        subjectController.getSubjectById,
    )
    
router.get(
    "/:commonId/referenceMaterial", 
    authController.protect, 
    subjectController.protectByRole("view"), 
    subjectController.getReferenceMaterial,
);

router.route('/for-user')
    .post(
        authController.protect,
        // protectByRole ----------------------- ???, 
        subjectController.getSubjectForUser
    )

router.patch(
    '/update-by-user/:commonId',
    authController.protect, 
    subjectController.protectByRole("edit"), 
    subjectController.updateByUser
)

router.patch(
    '/update-module-by-user/:commonId',
    authController.protect, 
    subjectController.protectByRole("edit"), 
    subjectController.modulesUpdateByUser
)

router.patch(
    '/accept-updates/:commonId',
    authController.protect, 
    subjectController.protectByRole("head"), 
    subjectController.acceptUpdates
)

router.patch(
    "/accept-modules-updates/:commonId",
    authController.protect, 
    subjectController.protectByRole("head"), 
    subjectController.acceptModulesUpdates
)

module.exports = router