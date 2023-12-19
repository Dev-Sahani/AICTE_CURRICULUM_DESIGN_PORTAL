const express = require("express");
const router = express.Router();
const {getAllResources,addResource,deleteResource} = require('../controllers/resourceContoller')

router.route("/").get(getAllResources) // with search functionality 
router.route("/").post(addResource)
router.route("/:id").delete(deleteResource)

module.exports = router;



