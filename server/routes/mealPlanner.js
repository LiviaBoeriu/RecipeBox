const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


// Get planner info
router.get("/", authorization, async (req, res) => {
    try {
        // Destructure req.body
        const { userId } = req;

        // Get recipe collection for the user
        const planner = await pool.query("SELECT * FROM planner WHERE userid = $1 AND date > current_date - interval '10' day;", [userId]);
        
        res.json(planner.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Edit day
router.patch("/:dayid", authorization, async (req, res) => {
    try {
        // Destructure req.body
        const { recipeId, mealtype } = req.body;
        const { dayid } = req.params;

        // Get recipe collection for the user
        const planner = await pool.query("UPDATE planner SET recipeid=($1) AND mealtype=($2) WHERE id = $3 RETURNING *)", [recipeId, mealtype, dayid]);
        
        res.json(planner.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



// Add recipe to planner
router.post("/", authorization, async (req, res) => {
    try {
        // Destructure req
        const { userId } = req;
        const { recipeId, date, mealtype } = req.body;

        // Add new entry to the planner
        const planner = await pool.query("INSERT INTO planner (recipeid, date, mealtype, userid) VALUES ($1, $2, $3, $4) RETURNING *)", [recipeId, date, mealtype, userId]);
        
        res.json(planner.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Get next meal info

// Delete recipe from day
router.delete("/:dayid/:recipeid", authorization, async (req, res) => {
    try {
        // Destructure req.body
        const { dayid, recipeid } = req.params;

        // Get recipe collection for the user
        const planner = await pool.query("DELTE FROM planner WHERE id = $1 AND recipeid = $2 RETURNING *)", [dayid, recipeid]);
        
        res.json(planner.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;