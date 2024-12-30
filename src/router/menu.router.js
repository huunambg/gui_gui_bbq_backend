const express = require('express')
const router = express.Router()
const MenuController = require('../controller/menu.controller')
router.post("/add-menu", MenuController.addMenu)
router.get("/get-all-menu", MenuController.getAllMenu)
router.put("/update-menu", MenuController.updateMenu)
router.delete("/delete-menu/:id", MenuController.deleteMenu)
module.exports = router
