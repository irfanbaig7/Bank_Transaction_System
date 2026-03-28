const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express();

// middleware of app
app.use(express.json())
app.use(cookieParser())


// api endpoint
app.use("/api/auth", authRouter)

module.exports = app