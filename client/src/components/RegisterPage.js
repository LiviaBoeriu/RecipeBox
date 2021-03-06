import React, { useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Label from "./Label";
import Logo from "./Logo";
import Footer from "./Footer"
import LoginPicture from "../assets/images/login-picture.jpg";
import { Link } from "react-router-dom";

// Maybe add toastify for successful registration, login, logout
const Register = ({setAuth}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const message = useRef();


    // Need to add response in case the the user already exists
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            // Construct the request body with state elements
            const body = { username, password, firstname, lastname };

            if(!username || !password || !firstname || !lastname){
                setAuth(false);
                message.current.classList.remove("no-opacity");
                message.current.classList.add("error-message");
                message.current.innerHTML = "The required fields are not completed";
            } else {
                // Check if the password matches and then make the request
                if(password !== repeatPassword) {
                    message.current.classList.remove("no-opacity");
                    message.current.classList.add("error-message");
                    message.current.innerHTML = "The passwords do not match";
                } else {
                    message.current.classList.add("no-opacity");

                    const response = await fetch("http://localhost:5000/auth/register", 
                    {
                        method: "POST",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify(body)
                    });


                    if(response.status === 200) {
                        // Parse the response so that we can use the token
                        const parseRes = await response.json();

                        // Set the token to the localStorage
                        localStorage.setItem("token", parseRes.token);

                        setAuth(true);
                    }

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
                        Register below
                    </h4>   
                    <form className="login-form" onSubmit={onSubmitForm}>

                        <div className="form-inputs register">
                            <div className="form-input-container">
                            <Label value="Username *"/>
                            <Input value={username} changeHandler={setUsername} type="text"/>
                            </div>

                            <div className="form-input-container">
                            <Label value="Password *"/>
                            <Input value={password} changeHandler={setPassword} type="password"/>
                            </div>

                            <div className="form-input-container">
                            <Label value="Repeat Password *"/>
                            <Input value={repeatPassword} changeHandler={setRepeatPassword} type="password"/>
                            </div>

                            <div className="register-name-container">
                                <div className="form-input-container">
                                <Label value="First Name *"/>
                                <Input value={firstname} changeHandler={setFirstName} type="text"/>
                                </div>

                                <div className="form-input-container">
                                <Label value="Last Name"/>
                                <Input value={lastname} changeHandler={setLastName} type="text"/>
                                </div>
                            </div>
                            <p>* Marked fields are required</p>

                            <p ref={ message } className="notification-message-register no-opacity"> Error message </p>
                        </div>


                        <Button class="form-button" label="Register"/>
                    </form>

                    <div className="register-call-to-action">
                        <Link to="/">Already have an account?</Link>
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

export default Register;