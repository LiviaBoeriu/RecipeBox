const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRoute = require("./routes/jwtAuth");
require('dotenv').config();


const app = express();

// Middleware
// Using cors the back-end can now communicate with the front-end
app.use(cors());
// req.body access
app.use(express.json());

// Routes

// Register and login routes
app.use("/auth", authRoute);



app.listen(5000, () => {
    console.log("The server is running");
});