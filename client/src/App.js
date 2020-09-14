import React, { Fragment } from 'react';
import './assets/styles/index.scss';

// components
import Login from "./components/Login/Login.js"

function App() {
  return (
    <Fragment>
      <div className="container">
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
