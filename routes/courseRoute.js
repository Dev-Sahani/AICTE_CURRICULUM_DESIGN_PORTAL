const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const { generatePDF, generateHTML } = require("../pdfCreation/index")

router.get("/",
    authController.protect,
    courseController.getAllCoursesUserWise
) // wiht search functionality 


const onIdRouter = express.Router({mergeParams:true})

router.use("/:commonId",authController.protect, onIdRouter)

onIdRouter
    .get("/",
        authController.protect,
        courseController.getCourse
    )
    .get("/basic-info", 
        authController.protect,
        courseController.getBasicInfo
    )
    .get("/categories", 
        authController.protect,
        courseController.getCategory
    )
    .get("/semesters", 
        authController.protect,
        courseController.getSemester
    )
    .get("/subjects", 
        authController.protect,
        courseController.getSubjects
    )
    .patch("/update-by-user/", 
        authController.protect,
        courseController.updateByUser
    )
    .patch("/accept-updates", 
        authController.protect,
        courseController.acceptUpdates
    )
    .get("/users", 
        authController.protect,
        userController.getCourseUser
    )
    .patch("/users", 
        authController.protect,
        userController.addCourseUser
    )
    .delete("/users", 
        authController.protect,
        userController.deleteCourseUser
    )

onIdRouter.get("/pdf", 
    authController.protect,
    async (req, res, next)=>{
        const commonId = req.params.commonId
        
        await generatePDF(commonId, res, next);
        // res.status(200)
    }
)

onIdRouter.get("/pdf-html", 
    authController.protect,
    async (req,res,next)=>{
        const commonId = req.params.commonId

        await generateHTML(commonId, res, next);
        res.status(200).type('html').send({
            html
        })
        // res.setHeader('content-type', )
    }
)

module.exports = router;