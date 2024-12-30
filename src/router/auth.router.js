const express = require('express')
const router = express.Router()
const AuthController = require("../controller/auth.controller")
router.get("/get-all-user", AuthController.getAllUser)
//router.get("/get-all-user/:search",AuthController.getUserWithFilter)
router.put("/update-user/:user_id", AuthController.updateUser)
// router.get("/get-all-teacher",AuthController.getAllTeacher)
module.exports = router
