const OrderModel = require("../model/order.model")



const addOrder = function (req, res) {
    let data = req.body
    OrderModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add Order failure" })
        } else {
            res.send({ message: "Add Order success", data: data, insert_id: result.insertId })
        }
    })
}

const getAllOrder = function (req, res) {
    OrderModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all Order Failure" })
        } else {
            res.send({ data: result, message: "Get all Order Success" })
        }
    })
}

const deleteOrder = function (req, res) {
    let id = req.params.id
    OrderModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete Order Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id Ordere" })
        } else {
            res.send({ message: "Delete Order Success" })
        }
    })
}


const updateOrder = function (req, res) {
    let data = req.body
    OrderModel.update(data.order_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update Order Failure" })
        } else {
            res.send({ data: result, message: "Update Order Success" })
        }
    })
}





const OrderController = {
    addOrder, getAllOrder, deleteOrder, updateOrder,
}

module.exports = OrderController
