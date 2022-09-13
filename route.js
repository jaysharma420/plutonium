const express = require('express')
const router = express.Router();
const {createCollege} = require('./src/controller/collegeContoller')

router.get('/test', (req,res)=>
    res.send('API fired 🎇🎇🎇')
)

router.post('/functionup/colleges',createCollege)



module.exports = router;