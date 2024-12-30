const express = require('express')
const router = express.Router()
const OrderController = require("../controller/order.controller")
router.post("/add-order", OrderController.addOrder)
router.get("/get-all-order", OrderController.getAllOrder)
router.put("/update-order", OrderController.updateOrder)
router.delete("/delete-order/:id", OrderController.deleteOrder)
module.exports = router
