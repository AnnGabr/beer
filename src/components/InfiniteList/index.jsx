import React, { Component } from 'react';

import { Loader } from '../../components';

import './infinite-list-wrapper.css';

export default class InfiniteBeerList extends Component {
    componentDidMount() {
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
        )    
    }

    getLoader = () => (
        this.props.loading ? <Loader /> : null
    )

    addScrollListener = () => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if(scrollableComponent) {
            scrollableComponent.addEventListener('scroll', this.handleScroll);
        }
    }

    removeScrollListener = () => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if(scrollableComponent) {
            scrollableComponent.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll = (event) => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if (!scrollableComponent) {
            return;
        }
        
        const isAtEnd = (
            scrollableComponent.clientHeight +  scrollableComponent.scrollTop 
                >= scrollableComponent.scrollHeight - 10
        );
        if (isAtEnd) {
            this.props.onEndAchive();
        }
    }
}