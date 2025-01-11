const db = require("../common/connect")


const TransactionModel = function () {
}

TransactionModel.insert = function (data, result) {
    let sql = "INSERT INTO Transaction SET ?"
    db.query(sql, data, function (err, res) {
        if(err){
            console.log(err);
        }
        result(err, res)
    })
}


TransactionModel.getAllByTable = function (tableId,result) {
    let sql = `SELECT * FROM Transaction where table_id = '${tableId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

TransactionModel.getAll = function (result) {
    let sql = `SELECT * FROM Transaction`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

TransactionModel.delete = function (TransactionId, result) {
    let sql = `Delete FROM Transaction WHERE transaction_id = '${TransactionId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

TransactionModel.update = function (TransactionId, data, result) {
    let sql = `UPDATE Transaction SET ? WHERE transaction_id = '${TransactionId}'`
    db.query(sql, data, function (err, res) {
        console.log(res);
        
        result(err, data)
    })
}

module.exports = TransactionModel