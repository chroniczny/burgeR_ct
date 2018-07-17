import React from 'react';
import Auxy from '../../../hoc/Auxy.js';
import Button from '../../UI/Button/Button'

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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>

        </Auxy>
    );

};

export default orderSummary;