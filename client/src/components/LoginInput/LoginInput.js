import React, { Fragment, useState } from "react";
// import "../../assets/styles/index.scss";

const LoginInput = () => {

    const [inputValue, setInputValue] = useState(" ");

    return (
        <Fragment>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
        </Fragment>
    );
}

export default LoginInput;