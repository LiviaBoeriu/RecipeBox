const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");


// Get recipe info
router.get("/recipes", authorization, async (req, res) => {
    try {
        // console.log(req.query);
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
router.post("/recipes", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { recipeName, description } = req.body;
        const containerQuery = await pool.query("SELECT id FROM recipe_container WHERE userid = $1", [userId]);
        const containerid = containerQuery.rows[0].id;


        // Need to add validation to check if the recipe exists already

        // Add recipe
        const newRecipe = await pool.query("INSERT INTO recipe (name, containerid, description, userid) VALUES ($1, $2, $3, $4) RETURNING *", [recipeName, containerid, description, userId]);

        res.json(newRecipe.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Add new recipe instructions
router.post("/recipes/instructions", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { recipeid, instructionNumber, instructionText } = req.body;
        const containerQuery = await pool.query("SELECT id FROM recipe_container WHERE userid = $1", [userId]);
        const containerid = containerQuery.rows[0].id;
        let newInstruction;
        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeid]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }
        
        const instruction = await pool.query("SELECT * FROM instructions WHERE instruction_number=$1 AND recipeid=$2", [instructionNumber, recipeid]);
        console.log(instruction.rows[0]);
        // If instruction does not exist insert it, else return error message
        if(instruction && !instruction.rows[0]) {
            newInstruction = await pool.query("INSERT INTO instructions (instruction_number, instruction_text, containerid, recipeid) VALUES ($1, $2, $3, $4) RETURNING *", [instructionNumber, instructionText, containerid, recipeid]);
            res.json(newInstruction.rows[0]);
        } else {
            res.status(403).send("Instruction already exists");
        }
    } catch (err) {
        console.error(err.message);
        res.send("Server Error");
    }
});

// Edit instruction


// Edit recipe
router.patch("/recipes/recipe", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { recipeid, name, description } = req.body;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeid]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        // Update recipe
        const updatedRecipe = await pool.query("UPDATE recipe SET name=($1), description=($2) WHERE id = $3 RETURNING *", [name, description, recipeid]);

        res.json(updatedRecipe);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Delete recipe
router.delete("/recipes/:recipeId", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { recipeId } = req.params;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if tthe recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        // Delete recipe
        const updatedRecipe = await pool.query("DELETE FROM recipe WHERE id = $1", [recipeId]);

        res.json(updatedRecipe);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Search recipe
router.get("/recipes/search", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { name } = req.query;


        // Get recipe based on recipe id
        const recipe = await pool.query("SELECT * FROM recipe WHERE name LIKE $1 AND userid = $2", [name, userId]);
       
        res.json(recipe.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;