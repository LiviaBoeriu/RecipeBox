import React,  { useState } from 'react';
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

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

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
