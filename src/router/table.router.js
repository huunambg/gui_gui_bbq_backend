const express = require('express')
const router = express.Router()
const TableController = require("../controller/table.controller")
router.post("/add-table", TableController.addTable)
router.get("/get-all-table", TableController.getAllTable)
router.put("/update-table", TableController.updateTable)
router.delete("/delete-table/:id", TableController.deleteTable)
module.exports = router
