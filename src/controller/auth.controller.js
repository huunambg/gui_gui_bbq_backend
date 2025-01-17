const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AuthModel = require("../model/auth.model");
const { log } = require('console');

// Cấu hình thư mục lưu ảnh
const uploadDir = './uploads/avatars';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer để lưu ảnh vào thư mục đã chỉ định
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Lưu ảnh vào thư mục uploads/avatars
    },
    filename: function (req, file, cb) {
        // Lấy user_id từ params hoặc body (tùy vào yêu cầu)
        const userId = req.params.id || req.body.id;
        const fileExtension = path.extname(file.originalname);  // Lấy phần mở rộng của file (ví dụ: .jpg, .png)
        const fileName = `${userId}${fileExtension}`;

        // Kiểm tra nếu file đã tồn tại thì ghi đè
        const filePath = path.join(uploadDir, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Xóa file cũ nếu tồn tại
        }

        cb(null, fileName);  // Đặt tên file theo user_id
    }
});

const upload = multer({ storage: storage });

// Hàm xử lý cập nhật avatar
const updateAvatar = function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        // Tạo URL công khai cho ảnh đã tải lên
        const filePath = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
        console.log(filePath);
        let id = req.params.id
        AuthModel.updateAvatar(id, filePath, function (result) {
            if (result != "Fail") {
                res.send({ data: result, message: "Cập nhật thông tin thành công", url: filePath })
            } else {
                res.send({ data: result, message: "Cập nhật thông tin thất bại" })
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



const register = function (req, res) {
    let data = req.body
    AuthModel.insert(data, function (result) {
        if (result == "Fail") {
            res.status(502).send({ message: "Error Server" })
        } else if (result == "Email_already_exists") {
            res.status(401).send({ message: "Email already exists" })
        } else {
            res.send({ data: { email: data.email, password: data.password, user_id: result }, message: "Create User complete" })
        }
    })

}

const login = function (req, res) {
    let user = req.body
    AuthModel.getOne(user, async function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Login complete" })
        } else {
            res.status(401).send({ message: "Đăng nhập thất bại tài khoản hoặc mật khẩu không chính xác." })
        }
    })
}


const getAllUser = function (req, res) {
    AuthModel.getAllUser(function (err, data) {
        if (err) {
            res.status(402).send({ message: "Get all User fail" })
        } else {
            res.send({ data: data })
        }

    })
}


const getUserWithFilter = function (req, res) {
    let search = req.params.search
    AuthModel.getWithFilter(search, function (result) {
        if (result != "Fail") {
            res.send({ data: result })
        }
    })

}
const deleteUser = function (req, res) {
    let userId = req.params.id
    AuthModel.delete(userId, function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Xóa thông tin thành công" })
        } else {
            res.send({ data: result, message: "Xóa thông tin thất bại" })
        }
    })

}

const updateUser = function (req, res) {
    let Auth = req.body
    let userId = req.body.user_id
    AuthModel.update(userId, Auth, function (result) {
        if (result != "Fail") {
            res.send({ data: result, message: "Cập nhật thông tin thành công" })
        } else {
            res.send({ data: result, message: "Cập nhật thông tin thất bại" })
        }
    })

}



const AuthController = {
    register,
    login,
    updateUser,
    getUserWithFilter, getAllUser, upload, updateAvatar, deleteUser
}

module.exports = AuthController
