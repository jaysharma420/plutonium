const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createuser = async function (req, res) {
    let data = req.body
    let savedata = await userModel.create(data)
    res.send({ status: true, msg: savedata })

}

const getuser = async function (req, res) {
    let user = req.params.userId
    if (!user) return res.send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.send({ status: false, msg: "user id is not valid" })
    res.send({ status: true, msg: udata })

}

const update = async function (req, res) {

    let user = req.params.userId
    if (!user) return res.send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.send({ status: false, msg: "user id is not valid" })


    let data = req.body
    if (!(Object.keys(data).length > 0)) return res.send({ status: false, msg: "no data present to update" })

    let updata = await userModel.findOneAndUpdate(
        { _id: user },
        { $set: data },
        { new: true }
    )
    res.send({ status: "updated data", msg: updata })


}

const deletedata = async function (req, res) {

    let user = req.params.userId
    if (!user) return res.send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.send({ status: false, msg: "user id is not valid" })

    let updata = await userModel.findOneAndUpdate(
        { _id: user },
        { $set: { isDeleted: true } },
        { new: true }
    )
    res.send({ status: "data deleted", msg: updata })


}
module.exports.createuser = createuser
module.exports.getuser = getuser
module.exports.update = update
module.exports.delete = deletedata