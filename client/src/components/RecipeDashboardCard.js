import React from "react";

const RecipeDashboardCard = (props) => {

    return (
        <div className="recipe-dashboard-card">
            <label> { props.name } </label>
            <label> { props.prepTime } </label>
        </div>
    );
}

export default RecipeDashboardCard;