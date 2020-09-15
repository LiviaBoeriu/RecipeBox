import React, { Fragment } from 'react';
import './assets/styles/index.scss';

// components
import Login from "./components/Login"
import Logo from "./components/Logo"

function App() {
  return (
    <Fragment>
      <div className="container">
        <Logo />
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
