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
router.post("/recipes", authorization, async (req, res) => {
    try {

        // Destructure req
        const { userId } = req;
        const { recipeName, cookingTime, description, ingredients, instructions } = req.body;

        // Map all values in ingredients and instructions
        let ingredientName = ingredients.map(({ ingredientName }) => ingredientName);
        let measuringUnit = ingredients.map(({ measuringUnit }) => measuringUnit);
        let amount = ingredients.map(({ amount }) => amount);
        let instructionNumber = instructions.map(({ instructionNumber }) => instructionNumber);
        let instructionText = instructions.map(({ instructionText }) => instructionText);

        // Get container id
        const containerQuery = await pool.query("SELECT id FROM recipe_container WHERE userid = $1", [userId]);
        const containerId = containerQuery.rows[0].id;

        // Add recipe
        const newRecipe = await pool.query("INSERT INTO recipe (name, containerid, description, userid, cookingTime) VALUES ($1, $2, $3, $4, $5) RETURNING *", [recipeName, containerId, description, userId, cookingTime]);

        // Add ingredients to ingredient table
        // get recipe id
        const recipeId = newRecipe.rows[0].id;

        // loop through all ingredients 
        for(let ingredient in ingredients) {

            // check if the ingredient exists if not add it to the table
            const ingredientInDb = await pool.query("SELECT * FROM ingredient WHERE ingredientname LIKE '$1'", [ingredientName[ingredient]]);

            // if(ingredientInDb.rows[0]){
            //     res.json(ingredientInDb.rows[0]);
            // }

            // Add ingredients, recipeId to recipe_ingredients table
            // loop through ingredients and add them to the recipe ingredient with their respective recipe id and amount
            const newIngredient = await pool.query("INSERT INTO ingredient (ingredientname, measuringunit) VALUES ($1, $2) RETURNING *", [ingredientName[ingredient], measuringUnit[ingredient]]);

            // Get ingredient ids and add them to the next recipe
            const ingredientId = newIngredient.rows[0].id;

            const newRecipeIngredient = await pool.query("INSERT INTO recipe_ingredient (recipeid, ingredientid, amount) VALUES ($1, $2, $3) RETURNING *", [recipeId, ingredientId, amount[ingredient]]);

        }

        for(instruction in instructions) {

            // Add instructions to instructions table with recipeId
            // Loop through all instructions and add them to the table along with their number and recipeId
            const newInstruction = await pool.query("INSERT INTO instructions (instruction_number, instruction_text, containerid, recipeid) VALUES ($1, $2, $3, $4) RETURNING *", [instructionNumber[instruction], instructionText[instruction], containerId, recipeId]);

        }

        // return an object containing all fields
        res.json(newRecipe.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



// Edit recipe ingredient
router.patch("/recipes/:recipeId/ingredient/:ingredientId", authorization, async (req, res) => {
    try {

        const {recipeId, ingredientId} = req.params;
        const {amount} = req.body;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        const ingredient = await pool.query("SELECT * FROM ingredient WHERE id = $1", [ingredientId]);

        // Verify if the ingredient exists
        if(ingredient && !ingredient.rows[0]) {
            res.status(404).send("Not found");    
        }

        // Update ingredient
        const updateIngredient = await pool.query("UPDATE recipe_ingredient SET amount=($1) WHERE id = $2 AND recipeid = $3 RETURNING *", [amount, ingredientId, recipeId]);

        res.json(updateIngredient);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Edit recipe instruction content
router.patch("/recipes/:recipeId/instruction/:instructionId", authorization, async (req, res) => {
    try {

        const {recipeId, instructionId} = req.params;
        const {instructionText} = req.body;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        const instruction = await pool.query("SELECT * FROM ingredient WHERE id = $1", [instructionId]);

        // Verify if the ingredient exists
        if(instruction && !instruction.rows[0]) {
            res.status(404).send("Not found");    
        }

        // Update ingredient
        const updateInstruction = await pool.query("UPDATE instructions SET instruction_text=($1) WHERE id = $2 AND recipeid = $3 RETURNING *", [instructionText, instructionId, recipeId]);

        res.json(updateInstruction);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Edit recipe 
router.patch("/recipes/:recipeId", authorization, async (req, res) => {
    try {

        const {recipeId} = req.params;
        const {recipeName, description} = req.body;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        // Update recipe
        const updateRecipe = await pool.query("UPDATE recipe SET name=($1), description=($2)  WHERE id = $3 RETURNING *", [recipeName, description, recipeId]);

        res.json(updateRecipe);

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
        const deletedRecipe = await pool.query("DELETE FROM recipe WHERE id = $1", [recipeId]);

        res.json(deletedRecipe);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Delete recipe ingredient
router.delete("/recipes/:recipeId/ingredients/:ingredientId", authorization, async (req, res) => {
    try {

        // Destructure req
        const {recipeId, ingredientId} = req.params;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        const ingredient = await pool.query("SELECT * FROM ingredient WHERE id = $1", [ingredientId]);

        // Verify if the ingredient exists
        if(ingredient && !ingredient.rows[0]) {
            res.status(404).send("Not found");    
        }
        // Delete recipe
        const deleteIngredient = await pool.query("DELETE FROM recipe_ingredient WHERE ingredientid = $1 AND recipeid = $2", [ingredientId, recipeId]);

        res.json(deleteIngredient);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Delete recipe instruction
router.delete("/recipes/:recipeId/instructions/:instructionId", authorization, async (req, res) => {
    try {

        // Destructure req
        const {recipeId, instructionId} = req.params;

        const recipe = await pool.query("SELECT * FROM recipe WHERE id = $1", [recipeId]);

        // Verify if the recipe exists
        if(recipe && !recipe.rows[0]) {
            res.status(404).send("Not found");    
        }

        const instruction = await pool.query("SELECT * FROM instructions WHERE id = $1", [instructionId]);

        // Verify if the ingredient exists
        if(instruction && !instruction.rows[0]) {
            res.status(404).send("Not found");    
        }
        // Delete recipe
        const deleteInstruction = await pool.query("DELETE FROM instructions WHERE id = $1 AND recipeid = $2", [instructionId, recipeId]);

        res.json(deleteInstruction);

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