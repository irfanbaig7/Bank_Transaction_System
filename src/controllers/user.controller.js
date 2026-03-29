const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {

    const { name, email, password } = req.body

    const isUserExist = await userModel.findOne({ email: email })

    if (isUserExist) {
        return res.status(422).json({
            message: "User already exist with email",
            status: "failed"
        })
    }

    // create user
    const user = await userModel.create({
        email,
        password,
        name
    })

    // token create
    const token = await jwt.sign(
        { userId: user._id, },
        process.env.JWT_SCRETE_KEY,
        { expiresIn: "3d" }
    )

    // save token into cookieParser
    res.cookie("JWT_TOKEN", token)

    // send success response
    res.status(201).json({
        message: "User register successfully..",
        user: {
            _id: user._id,
            email: user.email,
        },
        token
    })

}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    const existUser = await userModel.findOne({ email }).select("+password")

    if (!existUser) {
        return res.status(401).json({
            message: "Invalid user"
        })
    }

    const isPass = await bcrypt.compare(password, existUser.password)

    if (!isPass) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    // create token
    const token = await jwt.sign(
        { userId: existUser._id },
        process.env.JWT_SCRETE_KEY,
        { expiresIn: "3d" }
    )

    // set to token into cookie
    res.cookie("token", token)


    res.status(202).json({
        message: "user login successfulyy",
        user: {
            _id: existUser._id,
            email: existUser.email,
        },
        token
    })


}

const logoutUser = (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })


}



module.exports = {
    userRegister,
    loginUser,
    logoutUser
}
