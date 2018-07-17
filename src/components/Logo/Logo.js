import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'; // for webpack to know
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/> {/* for webpack to set this path from import*/}
    </div>
);

export default logo;