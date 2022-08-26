const ordermodel = require("../models/ordermodel")

const mw = async function(req,res,next){
    let data = req.headers.isfreeappuser
    if(data)next()
    else(res.send({msg:"header is not present"}))
}

const mw2 = async function(req,res,next){
    let data = req.headers.isfreeappuser
    req.isFreeAppUser = req.headers.isfreeappuser
    if(data)next()
    else(res.send({msg:"header is not present"}))
}
module.exports.mw = mw
module.exports.mw2 = mw2