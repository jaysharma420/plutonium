const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const productcontroller= require("../controllers/productcontroller")
const ordercontroller = require("../controllers/ordercontrolller")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createproduct",productcontroller.createproduct)

router.post("/createuser",commonMW.mw,UserController.createuser)

router.post("/createorder",commonMW.mw, ordercontroller.createorder)
 
router.put("/update",commonMW.mw2,UserController.createuser2)
module.exports = router;