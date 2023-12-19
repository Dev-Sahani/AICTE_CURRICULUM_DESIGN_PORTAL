const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
    }, 
    courseName: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }, 
    level: {
        type: String,
        required: true,
        enum: ["Undergraduate", "Postgraduate", "Diploma"],
    }, 
    program: {
        type: String,
        required: true,
        enum: [
            "Engineering and Technology", 
            "Architecture", 
            "Town Planning", 
            "Pharmacy", 
            "Applied Arts and Crafts", 
            "Architecture and Town Planning", 
            "Hotel Management and Catering", 
            "Management", 
            "MCA", 
            "Pharmacy",
        ]
    }
});

module.exports = mongoose.model("Other-curriculums", Schema);