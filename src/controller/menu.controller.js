const MenuModel = require("../model/menu.model")
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Cấu hình thư mục lưu ảnh
const uploadDir = './uploads/menu';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Cấu hình Multer để lưu ảnh vào thư mục đã chỉ định
const storageAdd = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Lưu ảnh vào thư mục uploads/avatars
    },
    filename: function (req, file, cb) {
        // Lấy user_id từ params hoặc body (tùy vào yêu cầu)
        MenuModel.getNextId((err, result) => {
            if (err) {
                res.status(401).send({ message: "get Next Id failure" })
            } else {
                const nextId = result[0].Auto_increment;
                const fileExtension = path.extname(file.originalname);  // Lấy phần mở rộng của file (ví dụ: .jpg, .png)
                const fileName = `${nextId}${fileExtension}`;
                // Kiểm tra nếu file đã tồn tại thì ghi đè
                const filePath = path.join(uploadDir, fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);  // Xóa file cũ nếu tồn tại
                }
                cb(null, fileName);  // Đặt tên file theo user_id
            }
        })


    }
});

const storageUpdate = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Lưu ảnh vào thư mục uploads/avatars
    },
    filename: function (req, file, cb) {
        let menuID = req.body.menu_id
        const fileExtension = path.extname(file.originalname);  // Lấy phần mở rộng của file (ví dụ: .jpg, .png)
        const fileName = `${menuID}${fileExtension}`;
        // Kiểm tra nếu file đã tồn tại thì ghi đè
        const filePath = path.join(uploadDir, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Xóa file cũ nếu tồn tại
        }
        cb(null, fileName);  // Đặt tên file theo user_id
    }
});
const uploadImageAdd = multer({ storage: storageAdd });
const uploadImageUpdate = multer({ storage: storageUpdate });

const addMenuWithImage = function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        const filePath = `${req.protocol}://${req.get('host')}/uploads/menu/${req.file.filename}`;
        const data = {
            ...req.body,
            image: filePath
        };
        MenuModel.insert(data, (err, result) => {
            console.log(result);
            if (err) {
                res.status(401).send({ message: "Add Menu failure" })
            } else {
                res.send({ message: "Add Menu success", data: data })
            }
        })

    } catch (error) {
        console.error('Error occurred while updating Menu:', error);
        res.status(500).send({
            message: 'An error occurred while updating Menu',
            error: error.message
        });
    }
};

// Hàm xử lý cập nhật avatar
const updateImage = function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        // Tạo URL công khai cho ảnh đã tải lên
        const filePath = `${req.protocol}://${req.get('host')}/uploads/menu/${req.file.filename}`;
        console.log(filePath);
        MenuModel.updateImage(req.params.id, filePath, (err, result) => {
            if (err) {
                console.log(err);
                res.status(401).send({ message: "Update Menu Failure" })
            } else {
                res.send({ data: result, message: "Update Menu Success" })
            }
        })

    } catch (error) {
        console.error('Error occurred while updating avatar:', error);
        res.status(500).send({
            message: 'An error occurred while updating avatar',
            error: error.message
        });
    }
};


// Hàm xử lý cập nhật avatar
const updateMenuWithImage = function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        // Tạo URL công khai cho ảnh đã tải lên
        const filePath = `${req.protocol}://${req.get('host')}/uploads/menu/${req.file.filename}`;
        console.log(filePath);
        const data = req.body;
        data['image'] = filePath
        console.log(data);
        
        MenuModel.update(data.menu_id, data, (err, result) => {
            if (err) {
                console.log(err);

                res.status(401).send({ message: "Update Menu Failure" })
            } else {
                res.send({ data: result, message: "Update Menu Success" })
            }
        })

    } catch (error) {
        console.error('Error occurred while updating avatar:', error);
        res.status(500).send({
            message: 'An error occurred while updating avatar',
            error: error.message
        });
    }
};




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
    addMenu, getAllMenu, deleteMenu, updateMenu, updateImage, uploadImageAdd, uploadImageUpdate, addMenuWithImage, updateMenuWithImage
}

module.exports = MenuController
