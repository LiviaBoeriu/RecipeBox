import React, { Fragment, useState } from "react";
// import "../../assets/styles/index.scss";
import LoginInput from "../LoginInput/LoginInput";

const Login = () => {

    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };

            console.log(username);
            const response = await fetch("http://localhost:5000/auth/login", 
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="form-header">
                Sign-in to your account
            </h1>
            <form onSubmit={onSubmitForm}>
                {/* This input has to become a component */}
                {/* <LoginInput /> */}
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>

                <button>Sign in</button>
            </form>
        </Fragment>
    );
}

export default Login;