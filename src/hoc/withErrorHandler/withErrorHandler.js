import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxy from '../Auxy/Auxy';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        // componentDidMount () { // after rendering child components
        componentWillMount () { // before rendering child components
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        };

        render () {
            return (
                <Auxy>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {/*Something din't work!*/}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxy>
            );
        }
    }
};

export default withErrorHandler;