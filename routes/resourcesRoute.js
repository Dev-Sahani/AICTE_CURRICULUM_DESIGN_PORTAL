const express = require("express");
const router = express.Router();
const {getAllResources,addResource,deleteResource} = require('../controllers/resourceController')

router.route("/get-resouces").get(getAllResources) // with search functionality 
router.route("/add-resource").post(addResources)
router.route("/delete-resource").delete(deleteResource)

module.exports = router;



