const { StatusCodes } = require("http-status-codes");
const resourceModel = require("../models/resourceModel.js");
const factoryController = require('./factoryController')
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index.js");
const { resourceUsage } = require("process");



exports.getAllResources = factoryController.getByQuery(resourceModel)

exports.addResource = async function (req, res) {
    const { title,description,type,author,coverImageUrl,url } = req.body;
    const ResourceEntry = new resourceModel({
        title,
        description,
        type,
        author,
        coverImageUrl,
        url
    });
    const data = await ResourceEntry.save();
    res.status(StatusCodes.CREATED).json({
        status:"success",
        data:data
    });
}

exports.deleteResource= factoryController.deleteById(resourceModel)

exports.updateResourceById = factoryController.patchOne(resourceModel)

exports.getResourceById = factoryController.getOne(resourceModel)
