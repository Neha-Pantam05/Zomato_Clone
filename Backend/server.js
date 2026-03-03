// start server
require("dotenv").config();

const app = require("./src/app.js");
const connectDB = require("./src/database/db.js");

// connect to database
connectDB();

// start server
app.listen(3000, () =>{
    console.log("Server is running on port 3000");
})

