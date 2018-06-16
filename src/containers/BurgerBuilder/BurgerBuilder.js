import React, { Component } from 'react';
import Auxy from '../../hoc/Auxy';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render () {
        return (
            <Auxy>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Auxy>
        );
    }
}

export default BurgerBuilder;