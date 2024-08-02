const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const {protect, restrictTo} = require('../controllers/authController')

router.route('/')
    .get(userController.getAllUser) //get all user
    .patch(userController.patchUser)
    
router.route("/:id" )
    .get(userController.getUser) //getOne
    .delete(restrictTo("administrator"), userController.deleteUser) //delete/inactive one

module.exports = router