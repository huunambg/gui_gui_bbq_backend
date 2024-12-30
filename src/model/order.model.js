const db = require("../common/connect")


const OrderModel = function () {
}

OrderModel.insert = function (data, result) {
    let sql = "INSERT INTO Orders SET ?"
    db.query(sql, data, function (err, res) {
        result(err, res)
    })
}


OrderModel.getAll = function (result) {
    let sql = `SELECT * FROM Orders`
    db.query(sql, function (err, res) {
        console.log(err);
        result(err, res)
    })
}

OrderModel.delete = function (OrderId, result) {
    let sql = `Delete FROM Orders WHERE Order_id = '${OrderId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

OrderModel.update = function (OrderId, data, result) {
    let sql = `UPDATE Orders SET ? WHERE Order_id = '${OrderId}'`
    db.query(sql, data, function (err, res) {
        console.log(res);

        result(err, data)
    })
}

module.exports = OrderModel