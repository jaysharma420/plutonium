const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const mw = async function(req,res,next){
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"x-auth-token key is not present in headers"})
    
    let decodetoken = jwt.verify(token,"this is the most important secret key")
    if(!decodetoken) return res.send({status:false,msg:"token is not verified"})
    
    let user = req.params.userId
    if(!user) return res.send({status:false,msg:"user id is not present in path-params"})
    
    let udata = await userModel.findById(user)
    if(!udata) return res.send({status:false,msg:"user id is not valid"})

    next()
}

module.exports.mw=mw