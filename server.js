// load env secrets
require("dotenv").config()

const connectDb = require("./src/database/db")
const app = require("./src/app")

// Database connection
connectDb()


// server start..
app.listen(3000, () => {
    console.log("Server is runnnig on port 3000");
})




