const db = require("../common/connect")


const BufferModel = function () {
}

BufferModel.insert = function (data, result) {
    let sql = "INSERT INTO Buffer SET ?"
    db.query(sql, data, function (err, res) {
        result(err, res)
    })
}


BufferModel.getAll = function (result) {
    let sql = `SELECT * FROM Buffer`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

BufferModel.delete = function (BufferId, result) {
    let sql = `Delete FROM Buffer WHERE buffer_id = '${BufferId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

BufferModel.update = function (BufferId, data, result) {
    let sql = `UPDATE Buffer SET ? WHERE buffer_id = '${BufferId}'`
    db.query(sql, data, function (err, res) {
        console.log(res);
        
        result(err, data)
    })
}

module.exports = BufferModel