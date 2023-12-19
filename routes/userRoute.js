const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const {protect, restrictTo} = require('../controllers/authController')

router.route('/')
    .get(userController.getAllUser) //get all user
    
router.route("/:id" )
    .get(userController.getUser) //getOne
    .patch(userController.patchUser)
    .delete(userController.deleteUser) //delete/inactive one

module.exports = router