const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validator");
const authorization = require("../middleware/authorization");

// Registering route
router.post("/register", validInfo, async (req, res) => {
    try {

        // Destructure the req.body (email, password, first name, last name)
        const { username, password, firstname, lastname } = req.body;

        // Check if user exists (if true then throw error)
        const user = await pool.query("SELECT * FROM account WHERE username = $1", [username]);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        // Bcrypt the user's password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert new user

        const newUser = await pool.query("INSERT INTO account (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *", [username, bcryptPassword, firstname, lastname]);
        const newBookshelf = await pool.query("INSERT INTO recipe_container (userid) VALUES ($1) RETURNING *", [newUser.rows[0].id]);
        // Generating jwt token

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({ token });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Login route
router.post("/login", validInfo, async (req, res) => {
    try {

        // Destructure req.body
        const { username, password} = req.body;

        // Check if user doesn't exist (if not throw error)

        const user = await pool.query("SELECT * FROM account WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or user is incorrect");
        }

        // Check if incomming password is the same as the db password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword) {
            
        console.log(validPassword);
            return res.status(401).json("Password or email is incorrect")
        }
        // Give jwt token
        const token = jwtGenerator(user.rows[0].id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Edit profile

// Verification route
router.get("/is-verified", authorization, async (req, res) => {
    try {

        res.json(req.user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;