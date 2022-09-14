
const collegeModel = require('../models/CollegeModel')
const internsModel = require('../models/internsModel')



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

    const  collegeName = await collegeModel.findOne({name:college})

    const{name,fullName,logoLink} = collegeName

    

    const intern = await internsModel.find({collegeId:collegeName._id}).select({name:1,email:1,mobile:1})


   const data = {
    name:name,
    fullName:fullName,
   logoLink:logoLink,
   interns:intern.length ? intern:{msg:"0 application from this collge"}
   
   }


   res.send({data:data})



}catch(err){return res.status(500).send({status:false,msg:err.message})}}
    



    



   




// module.exports = {createIntern}


module.exports = {createCollege,getCollegeDetails}