const { StatusCodes } = require("http-status-codes");
const otherCurriculumModel = require("../models/otherCurriculumsModel");

async function getAllCurriculum(req, res) {
    const data = await otherCurriculumModel.find({});
    res.status(StatusCodes.OK).json({data});
}

async function addOtherCurriculum(req, res) {
    const { instituteName, courseName, url, level, program } = req.body;
    if(!instituteName || !courseName || !url || !level || !program) {
        res.status(StatusCodes.BAD_REQUEST).json({error:'Incomplete data provided'});
    }
    else
    {
        const newCurriculumEntry = new otherCurriculumModel({
            instituteName,
            courseName,
            url,
            level,
            program
        });
        const savedCurriculum = await newCurriculumEntry.save();
        res.status(StatusCodes.CREATED).json({data:savedCurriculum});
    }
}

async function deleteOtherCurriculum(req, res) {
    const curriculumId = req.params.id;
    const deletedCurriculum = await otherCurriculumModel.findByIdAndDelete(curriculumId);

    if (!deletedCurriculum) {
        res.status(StatusCodes.NOT_FOUND).json({error:'Curriculum not found'});
    } else {
        res.status(StatusCodes.NO_CONTENT).send();
    }
}
