const college = require('../models/CollegeModel')

//validation by => JAY Sharama
const createCollege = async (req,res)=>{

    try{
        let data = req.body


        const datas = await college.create(data)
    
        res.status(201).send({status:true,data:datas})

    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


module.exports = {createCollege}