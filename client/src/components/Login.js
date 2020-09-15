import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Label from "./Label";


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
        <div className="login-container">
            <h4 className="form-header">
                Sign-in to your account
            </h4>
            <form className="login-form" onSubmit={onSubmitForm}>
                <div className="form-inputs">
                    <div className="form-input-container">
                    <Label value="Email"/>
                    <Input value={username} changeHandler={setUsername} type="text"/>
                    </div>

                    <div className="form-input-container">
                    <Label value="Password"/>
                    <Input value={password} changeHandler={setPassword} type="password"/>
                    </div>
                </div>

                <Button class="form-button" label="Sign in"/>
            </form>
            
            <div className="register-call-to-action">
                    <p>Want to create an account?</p>
                    <a href="/">Register here!</a>
            </div>
        </div>
    );
}

export default Login;