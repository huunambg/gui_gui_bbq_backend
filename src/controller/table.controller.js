const TableModel = require("../model/table.model")

const addTable = function (req, res) {
    let data = req.body
    TableModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add Table failure" })
        } else {
            res.send({ message: "Add Table success", data: data, insert_id: result.insertId })
        }
    })
}

const getAllTable = function (req, res) {
    TableModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all Table Failure" })
        } else {
            res.send({ data: result, message: "Get all Table Success" })
        }
    })
}

const deleteTable = function (req, res) {
    let id = req.params.id
    TableModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete Table Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id Tablee" })
        } else {
            res.send({ message: "Delete Table Success" })
        }
    })
}


const updateTable = function (req, res) {
    let data = req.body
    TableModel.update(data.table_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update Table Failure" })
        } else {
            res.send({ data: result, message: "Update Table Success" })
        }
    })
}



const TableController = {
    addTable, getAllTable, deleteTable, updateTable,
}

module.exports = TableController
