const BufferModel = require("../model/buffer.model")



const addBuffer = function (req, res) {
    let data = req.body
    BufferModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add Buffer failure" })
        } else {
            res.send({ message: "Add Buffer success", data: data })
        }
    })
}

const getAllBuffer = function (req, res) {
    BufferModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all Buffer Failure" })
        } else {
            res.send({ data: result, message: "Get all Buffer Success" })
        }
    })
}

const deleteBuffer = function (req, res) {
    let id = req.params.id
    BufferModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete Buffer Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id Buffere" })
        } else {
            res.send({ message: "Delete Buffer Success" })
        }
    })
}


const updateBuffer = function (req, res) {
    let data = req.body
    BufferModel.update(data.buffer_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update Buffer Failure" })
        } else {
            res.send({ data: result, message: "Update Buffer Success" })
        }
    })
}





const BufferController = {
    addBuffer, getAllBuffer, deleteBuffer, updateBuffer,
}

module.exports = BufferController
