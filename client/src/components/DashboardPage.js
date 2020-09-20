import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const DashboardPage = () => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
            {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();

            setName(parseRes.firstname);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect( () => {
        getName();
    });

    return (
        <div>
            <Navigation firstName={name}/>

            <Footer />
        </div>
    );
}

export default DashboardPage;