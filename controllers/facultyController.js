const Faculty = require('../models/facultyModel')
const factoryController =require("./factoryController.js")

exports.postFaculty = factoryController.postOne(Faculty)
exports.patchFaculty = factoryController.patchOne(Faculty)
exports.getFacultyById = factoryController.getOne(Faculty)
exports.getFacultyByQuery = factoryController.getByQuery(Faculty)

