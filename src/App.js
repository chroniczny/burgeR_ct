import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
    // state = {
    //     show: true
    // };
    //
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({show: false});
    //     }, 5000);
    // }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
