import React, {Component} from 'react';
import Auxy from '../../hoc/Auxy/Auxy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,

}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchaseble: false,
        totalPrice: 4,
        purchasing: false
    };

    updatePurchaseState(ingredients) { // when its updated it will be modified
        // const ingredients = { // copy state ingredients to modify them
        //     ...this.state.ingredients
        // };
        //... but we don't need that when ingredients are passes into a function

        const sum = Object.keys(ingredients) // make array of ingredients
            .map(igKey => {
                return ingredients[igKey]; // accessing to value of ech key
            })
            .reduce((sum, el) => { // not to flat array but reduce into a single number
                return sum + el;
            }, 0);

        this.setState({purchaseble: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(`ingredients count: ${oldCount}`);
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients); //
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(`ingredients count: ${oldCount}`);
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert('You continue!');
    };

    render() {
        const disableInfo = { // copied state.ingredients - separate instance
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Auxy>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredirntRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchaseble={this.state.purchaseble}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Auxy>
        );
    }
}

export default BurgerBuilder;