import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                // console.log(res.data);
                // so I need iterate through firebase object with unique keys
                // and push it into array of objects with those keys as a ids
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({loading: false, orders: fetchedOrders});
                console.log(this.state.orders);
            })
            .catch(err => {
                this.setState({loading: false})})

    }

    render() {
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        );
    }
};

export default withErrorHandler(Orders, axios);