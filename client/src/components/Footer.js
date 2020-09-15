import React from "react";
import Label from "./Label";

const Footer = (props) => {

    return (
        <footer>
            <Label value="Recipe Box @2020" />
            <div className="social-links-container">
                <i className="fab fa-github social-link"></i>
                <i className="fab fa-instagram social-link"></i>
            </div>
        </footer>
    );
}

export default Footer;