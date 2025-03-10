const express = require('express')
const router = express.Router()
const TransactionController = require("../controller/transaction.controller")
router.post("/add-transaction", TransactionController.addTransaction)
router.get("/get-all-transaction", TransactionController.getAllTransaction)
router.get("/get-all-transaction-by-date/:date", TransactionController.getAllTransactionByDate)
router.get("/get-all-transaction-by-month-year/:month/:year", TransactionController.getAllTransactionByMonthAndYear)
router.get("/get-last-transaction-by-table/:id", TransactionController.getLastTransactionByTable)
router.get("/get-all-transaction-by-year/:year", TransactionController.getAllTransactionByYear)
router.put("/update-transaction", TransactionController.updateTransaction)
router.delete("/delete-transaction/:id", TransactionController.deleteTransaction)
module.exports = router
