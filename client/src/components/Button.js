import React from "react";

const Button = (props) => {

    return (
    <button className={props.class}> {props.label} </button>
    );
}

export default Button;