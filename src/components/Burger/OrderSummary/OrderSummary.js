import React from 'react';
import Auxy from '../../../hoc/Auxy.js';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                </li>);
        });

    return (
        <Auxy>
            <h3>Your Order</h3>
            <p>A delicious burger wh the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxy>
    );

};

export default orderSummary;