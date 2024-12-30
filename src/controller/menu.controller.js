const MenuModel = require("../model/menu.model")



const addMenu = function (req, res) {
    let data = req.body
    MenuModel.insert(data, (err, result) => {
        if (err) {
            res.status(401).send({ message: "Add Menu failure" })
        } else {
            res.send({ message: "Add Menu success", data: data })
        }
    })
}

const getAllMenu = function (req, res) {
    MenuModel.getAll((err, result) => {
        if (err) {
            res.status(401).send({ message: "Get all Menu Failure" })
        } else {
            res.send({ data: result, message: "Get all Menu Success" })
        }
    })
}

const deleteMenu = function (req, res) {
    let id = req.params.id
    MenuModel.delete(id, (err, result) => {
        console.log(result);
        if (err) {
            res.status(401).send({ message: "Delete Menu Failure" })
        } else if (result.affectedRows == 0) {
            res.status(401).send({ message: "Not found id Menue" })
        } else {
            res.send({ message: "Delete Menu Success" })
        }
    })
}


const updateMenu = function (req, res) {
    let data = req.body
    MenuModel.update(data.menu_id, data, (err, result) => {
        if (err) {
            console.log(err);

            res.status(401).send({ message: "Update Menu Failure" })
        } else {
            res.send({ data: result, message: "Update Menu Success" })
        }
    })
}





const MenuController = {
    addMenu, getAllMenu, deleteMenu, updateMenu,
}

module.exports = MenuController
