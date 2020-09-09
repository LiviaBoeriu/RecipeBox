const express = require("express");
const cors = require("cors");
const pool = require("./db");
const authRouter = require("./routes/jwtAuth");
const recipeRouter = require("./routes/recipe");
const plannerRouter = require("./routes/mealPlanner");

require('dotenv').config();


const app = express();

// Middleware
// Using cors the back-end can now communicate with the front-end
app.use(cors());
// req.body access
app.use(express.json());

// Routes

// Register and login routes
app.use("/auth", authRouter);

// Dashboard to recipe index
app.use("/dashboard", recipeRouter);

// Meal planner routes
app.use("/planner", plannerRouter);


app.listen(5000, () => {
    console.log("The server is running");
});