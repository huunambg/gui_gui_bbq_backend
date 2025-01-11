const TransactionModel = require("../model/transaction.model")



const addTransaction = function (req, res) {
    let data = req.body
    TransactionModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add Transaction failure" })
        } else {
            res.send({ message: "Add Transaction success", data: data })
        }
    })
}

const getAllTransaction = function (req, res) {
    TransactionModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all Transaction Failure" })
        } else {
            res.send({ data: result, message: "Get all Transaction Success" })
        }
    })
}

const getLastTransactionByTable = function (req, res) {
    let id = req.params.id
    TransactionModel.getAllByTable(id, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Get Last Transaction Failure" })
        } else {
            res.send({ data: result[result.length - 1], message: "Get Last Transaction Success" })
        }
    })
}

const deleteTransaction = function (req, res) {
    let id = req.params.id
    TransactionModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete Transaction Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id Transactione" })
        } else {
            res.send({ message: "Delete Transaction Success" })
        }
    })
}


const updateTransaction = function (req, res) {
    let data = req.body
    TransactionModel.update(data.transaction_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update Transaction Failure" })
        } else {
            res.send({ data: result, message: "Update Transaction Success" })
        }
    })
}





const TransactionController = {
    addTransaction, getAllTransaction, deleteTransaction, updateTransaction, getLastTransactionByTable
}

module.exports = TransactionController
