const userModel = require("../models/user.model")
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

module.exports = {
    userRegister
}
