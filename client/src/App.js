import React,  { useState, useEffect } from 'react';
import './assets/styles/index.scss';

import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect 
} from "react-router-dom";

// components
import LoginPage from "./components/LoginPage";
import Register from "./components/RegisterPage";
import DashboardPage from './components/DashboardPage';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Setting a boolen if the user is authenticated or not
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  // Verifying if the user is authenticated for page refresh
  const isAuth = async () => {
    try{
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect( () =>  {
      isAuth();
  }, []);

  return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => !isAuthenticated ? <LoginPage {...props} setAuth={setAuth}/> : <Redirect to="/dashboard" />} /> 
          <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth}/> : <Redirect to="/" />} />
          <Route exact path="/dashboard/" render={props => isAuthenticated ? <DashboardPage {...props} setAuth={setAuth}/> : <Redirect to="/" />} />
        </Switch>
      </Router>
  );
}

export default App;
