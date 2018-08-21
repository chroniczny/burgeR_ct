import React from 'react';
import classes from './Order.css';

// () returns jsx and {} makes it a function
// we need to loop through ingredients to display them separately
const order = (props) => {

    // we could use that from "Burger" component
    // const ingredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         // console.log([...Array(props.ingredients[igKey])]);
    //         return [...Array(props.ingredients[igKey])]
    //             .map((_, i) => {
    //                 return <BurgerIngredient key={igKey + i} type={igKey}/>;
    //             });
    //     })
    //     .reduce((arr, el) => {
    //         return arr.concat(el)
    //     }, []);

    // or...

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {

        return ig.amount > 0 ? <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>
                {ig.name} ({ig.amount})
            </span> : null;
        }
    );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:<strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
    );
};

export default order;