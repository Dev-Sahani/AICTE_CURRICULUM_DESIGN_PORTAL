const express = require("express");
const router = express.Router();
const resourceContoller = require('../controllers/resourceContoller')

router.route("/").get(resourceContoller.getAllResources) // with search functionality 
router.route("/").post(resourceContoller.addResource)
router.route("/:id")
    .delete(resourceContoller.deleteResource)
    .patch(resourceContoller.updateResourceById)
    .get(resourceContoller.getResourceById)

module.exports = router;



