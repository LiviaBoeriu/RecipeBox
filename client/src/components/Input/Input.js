import React, { Fragment, useState } from "react";
// import "../../assets/styles/index.scss";

const Input = (props) => {

    return (
        <input type={props.type} value={props.value} onChange={e => props.changeHandler(e.target.value)} />
    );
}

export default Input;