const productmodel = require("../models/productmodel")

const createproduct = async function(req,res){
    let data = req.body
    let savedata = await productmodel.create(data)
    res.send({msg:savedata})
}


module.exports.createproduct= createproduct