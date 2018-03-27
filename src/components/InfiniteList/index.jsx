import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Loader } from '../../components';

import './infinite-list-wrapper.css';

export default class InfiniteBeerList extends Component {
    componentDidMount() {
        this.scrollableDOMElement = ReactDOM.findDOMNode(this.props.scrollableComponent);
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
    }

    render() {
        return (
            <div className="infinite-list-wrapper">
                {this.props.children}
                {this.getLoader()}
            </div>
        );
    }

    getLoader = () => (this.props.loading ? <Loader /> : null);

    addScrollListener = () => {
        if (this.scrollableDOMElement) {
            this.scrollableDOMElement.addEventListener('scroll', this.handleScroll);
        }
    };

    removeScrollListener = () => {
        if (this.scrollableDOMElement) {
            this.scrollableDOMElement.removeEventListener('scroll', this.handleScroll);
        }
    };

    handleScroll = () => {
        if (!this.scrollableDOMElement) {
            return;
        }

        const isAtEnd =
            this.scrollableDOMElement.clientHeight + this.scrollableDOMElement.scrollTop >=
            this.scrollableDOMElement.scrollHeight - 10;
        if (isAtEnd) {
            this.props.onEndAchive();
        }
    };
}
