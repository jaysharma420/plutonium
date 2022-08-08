const express = require('express');
const lodash = require('lodash');
const abc = require('../introduction/intro')
const pqr = require('../logger/logger')
const stu = require('../util/helper')
const xyz = require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    // console.log('My batch is', abc.name)
    // abc.printName()
    // pqr.welcome()
    // stu.printDate()
    // stu.printMonth()
    // stu. getBatchInfo()
    // xyz.trim("           function   up       ")
    // xyz.changetoLowerCase("PLS CHANGE THIS INTO A LOWER CASE")
    // xyz.changeToUpperCase("hey bro convert this into upper case")
    res.send('My second ever ever api!')
    stu.chuk()
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason