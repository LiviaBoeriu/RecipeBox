import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';

const Navigation = (props) => {
    return ( 
        <div className="navigation-container">
            <Logo />
            <div className="navigation-links-container">
            <Link className="navigation-link" to="/shelf">Recipe Shelf</Link>
            <Link className="navigation-link" to="/planner">Meal planner</Link>
            </div>
            <Button class="regular-button navigation-button" label={props.firstName} />
        </div>
    );
}

export default Navigation;