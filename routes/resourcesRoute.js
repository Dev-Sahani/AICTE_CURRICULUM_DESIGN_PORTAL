const express = require("express");
const router = express.Router();


router.route("/get-resouces").get(getAllResources) // with search functionality 
router.route("/add-resource").post(addResources)

module.exports = router;
