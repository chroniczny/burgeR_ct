import React, {Component} from 'react';
import Auxy from '../../hoc/Auxy/Auxy';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        purchasable: false,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        axios.get('https://burger-builder-rct.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

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

        this.setState({purchasable: sum > 0});
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
    //     // alert('You continue!');
    //     this.setState({loading: true});
    //
    //     const order = {
    //         ingredients: this.state.ingredients,
    //         price: this.state.totalPrice,
    //         customer: {
    //             name: 'Jakub K',
    //             address: {
    //                 street: 'Sessamystreet 16',
    //                 zipCode: '00-001',
    //                 country: 'Neverland'
    //             },
    //             email: 'tet@test.com'
    //         },
    //         deliveryMethod: 'fastest'
    //     };
    //
    //     axios.post('/orders.json', order) // ".json" for firebase
    //         .then(response => {
    //             this.setState({loading: false, purchasing: false});
    //         })
    //         .catch(error => {
    //             this.setState({loading: false, purchasing: false});
    //         });
// instead connecting and posting state to firebase we want to change route page to "/checkout"
        this.props.history.push('/checkout');
    };

    render() {
        const disableInfo = { // copied state.ingredients - separate instance
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loded </p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Auxy>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredirntRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Auxy>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxy>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxy>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);