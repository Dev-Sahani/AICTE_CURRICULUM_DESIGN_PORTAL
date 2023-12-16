const express = require("express");
const router = express.Router();


router.route("/get-resouces").get(getAllResources) // with search functionality 
router.route("/add-resource").post(addResources)
router.route("/delete-resouce").delete(deleteResources)

module.exports = router;
