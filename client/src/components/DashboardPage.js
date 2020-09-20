import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const DashboardPage = () => {

    const [name, setName] = useState("");

    // Get the users data from the server
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

    // Function gets called when component has been mount
    useEffect( () => {
        getName();
    }, []);


    // Logout function
    // const logout = (e) => {
    //     e.preventDefault();
    //     localStorage.removeItem("token");
    //     setAuth(false);
    // }


    return (
        <div>
            <Navigation firstName={name}/>

            {/* <Button onClick={e => logout(e)} */}
            <Footer />
        </div>
    );
}

export default DashboardPage;