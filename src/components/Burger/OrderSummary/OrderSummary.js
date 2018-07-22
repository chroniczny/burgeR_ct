import React, {Component}  from 'react';
import Auxy from '../../../hoc/Auxy/Auxy.js';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //This could be a functional component, doesn't have to be a class
    componentWillUpdate()  {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>);
            });

        return (
            <Auxy>
                <h3>Your Order</h3>
                <p>A delicious burger wh the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>

            </Auxy>
        );
    }
}

export default OrderSummary;