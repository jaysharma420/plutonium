const express = require('express')
const router = express.Router();
const {createCollege,getCollegeDetails} = require('./src/controller/collegeContoller')
const {createIntern} = require('./src/controller/internController')


router.get('/test', (req,res)=>
    res.send('API fired 🎇🎇🎇')
)

router.post('/functionup/colleges',createCollege)

router.post('/functionup/interns',createIntern)

router.get('/functionup/collegeDetails',getCollegeDetails)



module.exports = router;