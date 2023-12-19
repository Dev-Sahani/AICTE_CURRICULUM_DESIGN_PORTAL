const { StatusCodes } = require("http-status-codes");
const resourceModel = require("../models/resourceModel.js");
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index.js");



exports.getAllResources = async function(req, res) {
    const data = await resourceModel.find({});
    res.status(StatusCodes.OK).json({data});
}

exports.addResource = async function (req, res) {
    const { title,description,type,author,coverImageUrl,url } = req.body;
    if(!title || !description || !type || !author) {
        res.status(StatusCodes.BAD_REQUEST).json({error:'Incomplete data provided'});
    }
    else
    {
        const ResourceEntry = new resourceModelModel({
            title,
            description,
            type,
            author,
            coverImageUrl,
            url
        });
        const savedResourceEntry = await ResourceEntry.save();
        res.status(StatusCodes.CREATED).json({data:savedResourceEntry});
    }
}

exports.deleteResource= async function(req,res){
    const resourceId = req.params.id;
    const deletedResource = await resourceModel.findByIdAndDelete(resourceId);

    if (!deletedResource) {
        res.status(StatusCodes.NOT_FOUND).json({error:'Resource not found'});
    } else {
        res.status(StatusCodes.NO_CONTENT).send({
            status:"success",
            data:deletedResource
        });
    }
}
