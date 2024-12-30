const express = require('express')
const router = express.Router()
const OrderDetailController = require("../controller/order_detail.controller")
router.post("/add-order-detail", OrderDetailController.addOrderDetail)
router.get("/get-all-order-detail", OrderDetailController.getAllOrderDetail)
router.put("/update-order-detail", OrderDetailController.updateOrderDetail)
router.delete("/delete-order-detail/:id", OrderDetailController.deleteOrderDetail)
module.exports = router
