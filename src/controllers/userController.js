const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createuser = async function (req, res) {
    try {
    let data = req.body
    let savedata = await userModel.create(data)
    res.status(201).send({ status: true, msg: savedata })
} catch (err) {
    return res.status(500).send({ status: "false", msg: err.message })
}
}

const getuser = async function (req, res) {
try {
    let user = req.params.userId
    if (!user) return res.status(400).send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.status(404).send({ status: false, msg: "user id is not valid" })
    res.status(200).send({ status: true, msg: udata })
} catch (err) {
    return res.status(500).send({ status: "false", msg: err.message })
}
}

const update = async function (req, res) {

try {
    let user = req.params.userId
    if (!user) return res.status(400).send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.status(404).send({ status: false, msg: "user id is not valid" })


    let data = req.body
    if (!(Object.keys(data).length > 0)) return res.status(400).send({ status: false, msg: "no data present to update" })

    let updata = await userModel.findOneAndUpdate(
        { _id: user },
        { $set: data },
        { new: true }
    )
    res.status(200).send({ status: "updated data", msg: updata })
} catch (err) {
    return res.status(500).send({ status: "false", msg: err.message })
}

}

const deletedata = async function (req, res) {

    try{
    let user = req.params.userId
    if (!user) return res.status(400).send({ status: false, msg: "user id is not present in path-params" })

    let udata = await userModel.findById(user)
    if (!udata) return res.status(404).send({ status: false, msg: "user id is not valid" })

    let updata = await userModel.findOneAndUpdate(
        { _id: user },
        { $set: { isDeleted: true } },
        { new: true }
    )
    res.status(200).send({ status: "data deleted", msg: updata })

} catch (err) {
    return res.status(500).send({ status: "false", msg: err.message })
}
}
module.exports.createuser = createuser
module.exports.getuser = getuser
module.exports.update = update
module.exports.delete = deletedata