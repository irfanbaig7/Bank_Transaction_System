const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("server is connected to DB")                
    } catch (error) {
        console.log("Error inside mongoDb database connection, ", error.message)
        process.exit(1)
    }
}

module.exports = connectDb

