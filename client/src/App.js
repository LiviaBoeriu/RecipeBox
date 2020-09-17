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
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/register" component={ Register } />
        </Switch>
      </Router>
  );
}

export default App;
