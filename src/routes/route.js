const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const mw = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createuser", userController.createuser)

router.post("/login", mw.authentication)

router.get("/users/:userId", mw.authorisation, userController.getuser)

router.put("/users/:userId", mw.authorisation, userController.update)

router.delete("/users/:userId", mw.authorisation, userController.delete)

module.exports = router;