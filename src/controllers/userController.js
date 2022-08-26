const userModel = require("../models/userModel")

const createuser = async function(req,res){
    let data =  req.body
    data.isFreeAppUser = req.headers.isfreeappuser
    let savedata = await userModel.create(data)
    res.send({msg:savedata})
}


const createuser2 = async function(req,res){
    let data =  req.body
    console.log(req.isFreeAppUser);
    data.isFreeAppUser = req.isFreeAppUser
    let savedata = await userModel.create(data)
    res.send({msg:savedata})
}
module.exports.createuser = createuser
module.exports.createuser2 = createuser2