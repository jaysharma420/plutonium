const collegeModel = require("../models/CollegeModel");
const internsModel = require("../models/internsModel");


// const isValidString = function(value){   //it should not be like undefined or null.
//     if (typeof value === 'undefined' || value === null) return false   //if the value is undefined or null it will return false.
//     if (typeof value === 'string' && value.trim().length === 0) return false   //if the value is string & length is 0 it will return false.
//     return true
// }
const createIntern = async (req,res)=>{
try{
    let data = req.body
    if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "please enter intern details in body for creating" }) }

    if(!data.name)  { return res.status(400).send({ status: false, msg: "name is required" }) }
    if(!data.mobile)  { return res.status(400).send({ status: false, msg: "mobile is required" }) }
    if(!data.email)  { return res.status(400).send({ status: false, msg: "email is required" }) }
    if(!data.collegeName)  { return res.status(400).send({ status: false, msg: "collegeName is required" }) }

    // if(!mongoose.isValidObjectId(data.collegeId)){return res.status(400).send({ status: false, msg: "blogId is not in format"})}

    let validString =/^[a-zA-Z]+([_ -]?[a-zA-Z])*$/
    if(!validString.test(data.name)){return res.status(400).send({status:false,msg:"name should be in string "})}


    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!validEmail.test(data.email)) {
        return res.status(400).send({ status: false, msg: "please enter email in  correct format  e.g  xyz@abc.com" })
    }
    let emailExist =await internsModel.findOne({ email: data.email })
    
    if (emailExist) { return res.status(400).send({ status: false, msg: "Email already exits" }) }


    let validNumber = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/   //\d/;
    if(!validNumber.test(data.mobile)){return res.status(400).send({status:false,msg:" please enter 10 digit mobile number in "})}
    
    let collegeDetails = await collegeModel.findOne({name : data.collegeName}).select({_id:1})
    if(!collegeDetails){return res.status(404).send({ status: false, msg: `No college found with college name ${data.collegeName}` })}

    data["collegeId"] = collegeDetails

    delete data["collegeName"]

    const intern = await internsModel.create(data)

    res.status(201).send({status:true,data:intern})

}catch(err){
    res.status(500).send({status:false,message:err.message})
}
}

module.exports = {createIntern}