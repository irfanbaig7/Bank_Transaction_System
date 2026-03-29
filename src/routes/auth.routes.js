const express = require("express")
const {userRegister, loginUser, logoutUser} = require("../controllers/user.controller")

const authRouter = express.Router()

authRouter.post("/register", userRegister)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logoutUser)

module.exports = authRouter


