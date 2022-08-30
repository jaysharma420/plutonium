const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authentication = async function (req, res, next) {
    try {
        let username = req.body.emailId
        let password = req.body.password

        let user = await userModel.findOne({ emailId: username, password: password })
        if (!user) return res.status(404).send({ status: false, msg: "username or password is wrong" })

        let token = await jwt.sign(
            {
                userid: user._id.toString(),
                name: "mohan kumar",
                address: "ayodhya",
                pin: "102030"
            }, "this is the most important secret key"
        )
        res.status(200).setHeader("x-auth-token", token)
        res.status(200).send({ status: true, msg: token })

    } catch (err) {
        return res.status(500).send({ status: "false", msg: err.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
        if (!token) return res.status(400).send({ status: false, msg: "x-auth-token key is not present in headers" })

        let decodetoken = await jwt.verify(token, "this is the most important secret key")
        console.log(decodetoken);
        if (!decodetoken) return res.status(401).send({ status: false, msg: "token or signature key is missing" })

        if (!(decodetoken.userid === req.params.userId)) return res.status(403).send({ status: false, msg: "token is not verified" })
        next()
    } catch (err) {
        return res.status(500).send({ status: "false", msg: err.message })
    }
}
module.exports.authentication = authentication
module.exports.authorisation = authorisation