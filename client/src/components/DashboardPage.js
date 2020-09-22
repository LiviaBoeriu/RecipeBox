import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import RecipeDashboardCard from "./RecipeDashboardCard";

const DashboardPage = () => {

    const [name, setName] = useState("");
    const [recipes, setRecipes] = useState([]);

    // Get the users data from the server
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
            {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.firstname);
        } catch (err) {
            console.error(err.message);
        }
    }


    // Get the user's recipe list
    async function getRecipes() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/recipes",
            {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setRecipes(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    const recipeCards = recipes.slice(0, 3).map((recipe) =>
        <RecipeDashboardCard key={`recipeCard${recipe.id.toString()}`} name={recipe.name} prepTime={recipe.cookingTime} />
    );


    // Function gets called when component has been mount
    useEffect( () => {
        getName();
        getRecipes();
    }, []);


    // Logout function
    // const logout = (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     setAuth(false);
    // }


    return (
        <div>
            <Navigation firstName={name}/>
            <div className="default-padding card-section-dashboard">
                <h4>Browse recipes</h4>
                <div className="card-container">
                    {recipeCards}
                </div>
            </div>
            {/* <Button onClick={e => logout(e)} */}
            <Footer />
        </div>
    );
}

export default DashboardPage;