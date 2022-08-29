const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authentication = async function(req,res,next){
    let username = req.body.emailId
    let password = req.body.password
    
    let user = await userModel.findOne({emailId:username,password:password})
    if(!user) return res.send({status:false,msg:"username or password is wrong"})
    
    let token = await jwt.sign(
        {
            userid : user._id.toString(),
            name:"mohan kumar",
            address:"ayodhya",
            pin:"102030"
        },"this is the most important secret key"
    )
    res.setHeader("x-auth-token", token)
    res.send({status:true,msg:token})
}


const authorisation = async function(req,res,next){

    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"x-auth-token key is not present in headers"})
    
    let decodetoken =  await jwt.verify(token,"this is the most important secret key")
    console.log(decodetoken);
  if(!decodetoken)return res.send({status:false,msg:"token or signature key is missing"})

    if(!(decodetoken.userid ===   req.params.userId)) return res.send({status:false,msg:"token is not verified"})

}
module.exports.authentication = authentication
module.exports.authorisation = authorisation