import React, { useState, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import Logo from "./Logo";
import Footer from "./Footer"
import LoginPicture from "../assets/images/login-picture.jpg";
import { Link }  from "react-router-dom";


const LoginPage = ({setAuth}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const message = useRef();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };

            if(!username || !password) {
                message.current.classList.remove("no-opacity");
                message.current.classList.add("error-message");
                message.current.innerHTML = "You need to enter your username and password";
            } else {
                const response = await fetch("http://localhost:5000/auth/login", 
                {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)
                });
    
                const parseRes = await response.json();
    
                if(response.status === 200) {
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
                } else {
                    setAuth(false);
                    message.current.classList.remove("no-opacity");
                    message.current.classList.add("error-message");
                    message.current.innerHTML = "Your email or password are incorrect";
                }    
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="login-page">
            <div className="left-login-container">
                <Logo />
                <div className="login-container">
                    <h4 className="form-header">
                        Sign-in to your account
                    </h4>
                    <form className="login-form" onSubmit={onSubmitForm}>
                        <div className="form-inputs">
                            <div className="form-input-container">
                            <Label value="Username"/>
                            <Input value={username} changeHandler={setUsername} type="text"/>
                            </div>

                            <div className="form-input-container">
                            <Label value="Password"/>
                            <Input value={password} changeHandler={setPassword} type="password"/>
                            <a href="/">Forgot password?</a>
                            </div>

                            <p ref={ message } className="notification-message-register no-opacity"> Error message </p>
                        </div>

                        <Button class="form-button" label="Sign in"/>
                    </form>
                    
                    <div className="register-call-to-action">
                            <p>Want to create an account?</p>
                            <Link to="/register">Register here!</Link>
                    </div>
                </div>

                <Footer />
            </div>

            <div className="login-picture-container">
                <img className="login-page-picture" src={LoginPicture} alt="Food items on a table" />
            </div>
        </div>
    );
}

export default LoginPage;