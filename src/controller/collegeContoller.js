
const college = require('../models/CollegeModel')

//validation by => JAY Sharama
const createCollege = async (req,res)=>{

    try{
        let data = req.body


        const datas =await college.create(data)
    
        res.status(201).send({status:true,data:datas})

    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}












//------------------⭐GET/collegeDetails⭐---------------------------//

//get CollegeDetails by richard

// const createIntern = async (req,res)=>{

//     let data = req.body

//     const datas = await intern.create(data)

//     res.send({data:datas})
// }

const getCollegeDetails = async(req,res)=>{

try{
    const college = req.query.collegeName

    const  collegeName = await college.findOne({name:college})


    res.send({data:collegeName})





}catch(err){return res.status(500).send({status:false,msg:err.message})}}
    



    



   




// module.exports = {createIntern}


module.exports = {createCollege,getCollegeDetails}