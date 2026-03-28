
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required.."],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"],
        unique: [true, "Email Already Exists"]
    },
    name: {
        type: String,
        required: [true, "Name is required.."],
    },
    password: {
        type: String,
        required: [true, "Password is required.."],
        minlength: [6, "Password must be 6 character"],
        select: false
    }
}, { timestamps: true })


// middlware before before save make password hash
userSchema.pre("save", async function (){

    if (!this.isModified("password")) {
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    
    return
})


// method
userSchema.methods.comparePassword = async function (password) {    
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel

