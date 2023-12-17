const { StatusCodes } = require("http-status-codes");
const resourceModel = require("../models/resourceModel.js");
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index.js");



exports.getAllResources = async function(req, res) {
    const data = await resourceModel.find({});
    res.status(StatusCodes.OK).json({data});
}

exports.addResource = async function (req, res) {
    const { title,description,type,author,coverImageUrl,url } = req.body;
    if(!title || !description || !url || !type || !author || !coverImageUrl) {
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


