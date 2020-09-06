const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json()); //req.body

// Routes

// Insert new recipe
app.post("/accounts/new-user", async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        const newUser = await pool.query("INSERT INTO account (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *", [email, password, firstname, lastname]);

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(5000, () => {
    console.log("server has started");
});