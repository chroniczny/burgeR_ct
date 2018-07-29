import React, { Component } from 'react';

import calsses from './Modal.css';
import Auxy from '../../../hoc/Auxy/Auxy';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
       return nextProps.show !==this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[Modal] will update')
    }

    render() {
        return (
            <Auxy>
                <Backdrop show={this.props.show}
                          clicked={this.props.modalClosed}/>
                <div className={calsses.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </Auxy>
        );
    }

}

export default Modal;