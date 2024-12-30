const db = require("../common/connect")


const TableModel = function () {
}

TableModel.insert = function (data, result) {
    let sql = "INSERT INTO Tables SET ?"
    db.query(sql, data, function (err, res) {
        result(err, res)
    })
}


TableModel.getAll = function (result) {
    let sql = `SELECT * FROM Tables`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

TableModel.delete = function (TableId, result) {
    let sql = `Delete FROM Tables WHERE Table_id = '${TableId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

TableModel.update = function (TableId, data, result) {
    let sql = `UPDATE Tables SET ? WHERE Table_id = '${TableId}'`
    db.query(sql, data, function (err, res) {
        result(err, data)
    })
}

module.exports = TableModel