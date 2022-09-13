const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const interSchema = new mongoose.Schema({

    name: {type:String,
       required:"enter the your name",
       trim:true
     }, 
     email: {
        
        type:String,
        required:"Plese Enter the email",
         unique:true,
         trim:true
      },
       mobile: {
        type:Number,
        required :"Please Enter the mobile Number",
          unique:true,
        trim:true
    },
     collegeId: {
        type:ObjectId,
         ref :"College", 
     },

     isDeleted:{
        type:Boolean,
         default: false}
     },{timestamps:true}
)


module.exports = mongoose.model("Interns",interSchema)