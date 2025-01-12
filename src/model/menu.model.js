const db = require("../common/connect")


const MenuModel = function () {
}

MenuModel.insert = function (data, result) {
    let sql = "INSERT INTO Menu SET ?"
    db.query(sql, data, function (err, res) {
        result(err, res)
    })
}


MenuModel.getAll = function (result) {
    let sql = `SELECT * FROM Menu`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

MenuModel.delete = function (MenuId, result) {
    let sql = `Delete FROM Menu WHERE Menu_id = '${MenuId}'`
    db.query(sql, function (err, res) {
        result(err, res)
    })
}

MenuModel.update = function (MenuId, data, result) {
    let sql = `UPDATE Menu SET ? WHERE Menu_id = '${MenuId}'`
    db.query(sql, data, function (err, res) {
        result(err, data)
    })
}


MenuModel.updateImage = function (MenuId, image, result) {
    let sql = `UPDATE Menu SET image = '${image}' WHERE Menu_id = '${MenuId}' `
    db.query(sql, function (err, res) {
        result(err, res)
    })
}



module.exports = MenuModel