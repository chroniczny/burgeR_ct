import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: 'false'
    };

    orderHandler = (event) => {
        event.preventDefault(); // because its in form we don't want to reload the page so:
        console.log(this.props.ingredients);
        //code from Burger Builder
            this.setState({loading: true});

            const order = {
                ingredients: this.props.ingredients,
                // passed specially by querry parameters and next by props from Checkout
                price: this.props.price,
                customer: {
                    name: 'Jakub K',
                    address: {
                        street: 'Sessamystreet 16',
                        zipCode: '00-001',
                        country: 'Neverland'
                    },
                    email: 'tet@test.com'
                },
                deliveryMethod: 'fastest'
            };

            axios.post('/orders.json', order) // ".json" for firebase
                .then(response => {
                    this.setState({loading: false});
                    this.props.history.push('/'); //to back home after success
                })
                .catch(error => {
                    this.setState({loading: false});
                });

    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        // if(this.state.loading) {
        //     form = <Spinner />;
        // }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;