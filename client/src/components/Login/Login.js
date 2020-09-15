import React, { Fragment, useState } from "react";
// import "../../assets/styles/index.scss";
import Input from "../Input/Input";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch("http://localhost:5000/auth/login", 
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h4 className="form-header">
                Sign-in to your account
            </h4>
            <form onSubmit={onSubmitForm}>
                <Input value={username} changeHandler={setUsername} type="text"/>
                <Input value={password} changeHandler={setPassword} type="password"/>

                <button>Sign in</button>
            </form>
        </Fragment>
    );
}

export default Login;