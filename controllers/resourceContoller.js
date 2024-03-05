const { StatusCodes } = require("http-status-codes");
const resourceModel = require("../models/resourceModel.js");
const factoryController = require('./factoryController')
const { BAD_REQUEST, NOT_FOUND } = require("../errors/index.js");
const filterAPI = require('../utils/filterAPI.js')



exports.getAllResources = async (req, res, next)=>{
    const filt = {}
    if(req.query.search){
        const exp = new RegExp(`${req.query.search}`, 'i');
        // const exp = new RegExp(`.*${req.query.search}.*`,'i');
        filt["$or"] =  [{title:{ $regex: exp}}, {author:{ $regex:exp}}];
    }
    
    const query = resourceModel.find(filt)
    const filteredQuery = new filterAPI(query,req.query)
        .filterAndFind()
        .sort()
        .select()
        .paging()
    const data = await filteredQuery.query
    res.status(200).send({
        status:"success",
        length:data.length,
        data
    })
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

exports.deleteResource= factoryController.deleteById(resourceModel)

exports.updateResourceById = factoryController.patchOne(resourceModel)

exports.getResourceById = factoryController.getOne(resourceModel)
