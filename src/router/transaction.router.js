const express = require('express')
const router = express.Router()
const TransactionController = require("../controller/transaction.controller")
router.post("/add-transaction", TransactionController.addTransaction)
router.get("/get-all-transaction", TransactionController.getAllTransaction)
router.put("/update-transaction", TransactionController.updateTransaction)
router.delete("/delete-transaction/:id", TransactionController.deleteTransaction)
module.exports = router
