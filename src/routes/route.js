const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createuser",userController.createuser)

router.post("/login",userController.login)

router.get("/users/:userId",middleware.mw, userController.getuser)

router.put("/users/:userId",middleware.mw,userController.update)

router.delete("/users/:userId",middleware.mw,userController.delete)

module.exports = router;