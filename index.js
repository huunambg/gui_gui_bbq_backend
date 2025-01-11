const express = require("express")
const path = require('path');
const port = 3000;
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const router = express.Router()
const AuthRouter = require("./src/router/auth.router")
const AuthController = require("./src/controller/auth.controller")
const BufferRouter = require("./src/router/buffer.router")
const TableRouter = require("./src/router/table.router")
const MenuRouter = require("./src/router/menu.router")
const OrderRouter = require("./src/router/order.router")
const OrderDetailRouter = require("./src/router/order_detail.router")
const TransactionRouter = require("./src/router/transaction.router")
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
app.use("/public/api", router)
app.use("/public/api", AuthRouter)
app.use("/public/api", BufferRouter)
app.use("/public/api", TableRouter)
app.use("/public/api", MenuRouter)
app.use("/public/api", OrderRouter)
app.use("/public/api", OrderDetailRouter)
app.use("/public/api", TransactionRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(port, function () {
    console.log("server start on :", port)
})

