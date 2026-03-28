const express = require("express")
const {userRegister} = require("../controllers/user.controller")

const authRouter = express.Router()

authRouter.post("/register", userRegister)

module.exports = authRouter


