const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createuser = async function(req,res){
    let data = req.body
    let savedata = await userModel.create(data)
    res.send({status:true,msg:savedata})
}

const login = async function(req,res){
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


const getuser = async function(req,res){
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"x-auth-token key is not present in headers"})
    
    let decodetoken = jwt.verify(token,"this is the most important secret key")
    if(!decodetoken) return res.send({status:false,msg:"token is not verified"})

    let user = req.params.userId
    if(!user) return res.send({status:false,msg:"user id is not present in path-params"})
    
    let udata = await userModel.findById(user)
    if(!udata) return res.send({status:false,msg:"user id is not valid"})
res.send({status:true,msg:udata})
}

const update = async function(req,res){
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"x-auth-token key is not present in headers"})
    
    let decodetoken = jwt.verify(token,"this is the most important secret key")
    if(!decodetoken) return res.send({status:false,msg:"token is not verified"})

    let user = req.params.userId
    if(!user) return res.send({status:false,msg:"user id is not present in path-params"})
    
    let udata = await userModel.findById(user)
    if(!udata) return res.send({status:false,msg:"user id is not valid"})


let data = req.body
if(!(Object.keys(data).length > 0))return res.send({status:false,msg:"no data present to update"})

let updata = await userModel.findOneAndUpdate(
    {_id:user},
    {$set:data},
    {new:true}
)
res.send({status:"updated data",msg:updata})
}

const deletedata = async function(req,res){
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status:false,msg:"x-auth-token key is not present in headers"})
    
    let decodetoken = jwt.verify(token,"this is the most important secret key")
    if(!decodetoken) return res.send({status:false,msg:"token is not verified"})

    let user = req.params.userId
    if(!user) return res.send({status:false,msg:"user id is not present in path-params"})
    
    let udata = await userModel.findById(user)
    if(!udata) return res.send({status:false,msg:"user id is not valid"})

   
    let updata = await userModel.findOneAndUpdate(
        {_id:user},
        {$set:{isDeleted:true}},
        {new:true}
    )
    res.send({status:"data deleted",msg:updata})
}
module.exports.createuser = createuser
module.exports.login = login
module.exports.getuser = getuser
module.exports.update = update
module.exports.delete = deletedata