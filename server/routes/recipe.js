const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


// Get recipe info
router.get("/recipes", authorization, async (req, res) => {
    try {
        
        // Destructure req.body
        const { userId } = req;

        // Get recipe collection for the user
        const recipeList = await pool.query("SELECT * FROM recipe WHERE userid = $1", [userId]);
        
        res.json(recipeList.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Add recipe

// Edit recipe

// Delete recipe

// Search recipe


module.exports = router;