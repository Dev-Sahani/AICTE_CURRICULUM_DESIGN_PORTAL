const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const {protect, restrictTo} = require('../controllers/authController')

router.route('/')
    .get(protect, userController.getAllUser) //get all user
    .patch(protect, restrictTo("administrator"), userController.patchUser)
    
router.route("/:id" )
    .get(protect, userController.getUser) //getOne
    .delete(protect, restrictTo("administrator"),userController.deleteUser) //delete/inactive one

module.exports = router