import React from "react";

const BackButton = (props) => {

    const navigateBack = () => {
        const path = props.path;
        window.location.href = path;
    }

    return (
    <button className="back-button" onClick={ navigateBack }> <span class="material-icons"> arrow_back</span> </button>
    );
}

export default BackButton;