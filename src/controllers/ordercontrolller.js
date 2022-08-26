const ordermodel = require("../models/ordermodel")
const userModel = require("../models/userModel")
const productmodel = require("../models/productmodel")


const createorder = async function (req, res) {
    let data = req.body
    data.isFreeAppUser = req.headers.isfreeappuser
    let uid = data.userid
    let pid = data.productid
    let udata = await userModel.findById(uid)
    let pdata = await productmodel.findById(pid)
    console.log(udata);
    console.log(pdata);
    if(data.isFreeAppUser == "true"){data.amount = 0}else{
        if(udata.balance >= pdata.price){data.amount = pdata.price;
        let update = await userModel.findOneAndUpdate(
            {_id:uid},
            {$inc:{balance:-pdata.price}}
        )}else{res.send({msg:"user does not have sufficient balance"})}
    }
    if (uid) {
        if (pid) {
            if (udata) {
                if (pdata) {
                    let odata = await ordermodel.create(data)
                    res.send({ msg: odata })
                } else { res.send({ msg: "product id is not valid" }) }
            } else { res.send({ msg: "user id is not valid" }) }
        } else { res.send({ msg: "product id is not present" }) }
    } else { res.send({ msg: "user id is not present" }) }
}


module.exports.createorder = createorder