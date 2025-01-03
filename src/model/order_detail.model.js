const db = require("../common/connect")


const OrderDetailModel = function () {
}

OrderDetailModel.insert = function (data, result) {
    let sql = "INSERT INTO order_detail SET ?"
    db.query(sql, data, function (err, res) {
        if (err) {
            console.log(err);
        }
        result(err, res)
    })
}


OrderDetailModel.getAll = function (result) {
    let sql = `SELECT * FROM order_detail`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

OrderDetailModel.delete = function (orderDetailId, result) {
    let sql = `Delete FROM order_detail WHERE order_detail_id = '${orderDetailId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

OrderDetailModel.update = function (orderDetailId, data, result) {
    let sql = `UPDATE order_detail SET ? WHERE order_detail_id = '${orderDetailId}'`
    db.query(sql, data, function (err, res) {
        console.log(res);

        result(err, data)
    })
}

module.exports = OrderDetailModel