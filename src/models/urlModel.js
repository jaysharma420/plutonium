const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode : {
        required : true,
        type : String, 
        unique : true
    },
    longUrl : {
        required : true,
        type : String
    },
    shortUrl : {
        required : true, 
        unique : true,
        type : String,
    }
}, {timestamps : true})

module.exports = mongoose.model('Url', urlSchema)

