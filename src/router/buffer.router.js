const express = require('express')
const router = express.Router()
const ClassController = require("../controller/bufffer.controller")
router.post("/add-buffer", ClassController.addBuffer)
router.get("/get-all-buffer", ClassController.getAllBuffer)
router.put("/update-buffer", ClassController.updateBuffer)
router.delete("/delete-buffer/:id", ClassController.deleteBuffer)
module.exports = router
