const { StatusCodes } = require("http-status-codes");
const resourceModel = require("../models/resourceModel.js");
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index.js");



exports.getAllResources = async function(req, res) {
    const data = await resourceModel.find();
    res.status(StatusCodes.OK).json({
        status:'success',
        length:data.length,
        data
    });
}

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

exports.deleteResource= async function(req,res){
    const resourceId = req.params.id;
    const deletedResource = await resourceModel.findByIdAndDelete(resourceId);

    if (!deletedResource) {
        return next(new BAD_REQUEST("recource with given id not found"))
    } else {
        res.status(StatusCodes.NO_CONTENT).send({
            status:"success",
            data:deletedResource
        });
    }
}