const mongoose = require('mongoose')


const interSchema = new mongoose.Schema({

    name: {type:String,
       required:"enter the "}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
})