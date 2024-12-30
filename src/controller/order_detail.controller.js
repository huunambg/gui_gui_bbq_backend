const OrderDetailModel = require("../model/order_detail.model")



const addOrderDetail = function (req, res) {
    let data = req.body
    OrderDetailModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add OrderDetail failure" })
        } else {
            res.send({ message: "Add OrderDetail success", data: data })
        }
    })
}

const getAllOrderDetail = function (req, res) {
    OrderDetailModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all OrderDetail Failure" })
        } else {
            res.send({ data: result, message: "Get all OrderDetail Success" })
        }
    })
}

const deleteOrderDetail = function (req, res) {
    let id = req.params.id
    OrderDetailModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete OrderDetail Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id OrderDetaile" })
        } else {
            res.send({ message: "Delete OrderDetail Success" })
        }
    })
}


const updateOrderDetail = function (req, res) {
    let data = req.body
    OrderDetailModel.update(data.order_detail_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update OrderDetail Failure" })
        } else {
            res.send({ data: result, message: "Update OrderDetail Success" })
        }
    })
}





const OrderDetailController = {
    addOrderDetail, getAllOrderDetail, deleteOrderDetail, updateOrderDetail,
}

module.exports = OrderDetailController
