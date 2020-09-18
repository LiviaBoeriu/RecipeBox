import React from 'react';
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
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/dashboard" component={ DashboardPage } />
        </Switch>
      </Router>
  );
}

export default App;
