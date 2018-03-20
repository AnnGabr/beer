import React, { Component } from 'react';

import { BeerList, Loader } from '../../components';

import './beer-list-wrapper.css';

export default class InfiniteBeerList extends Component {
    componentDidMount() {
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
    }

    render() {
        return (
            <div className="beer-list-wrapper">
                <BeerList beers={this.props.beers} />
                <Loader loading={this.props.loading}/>
            </div>
        )    
    }

    addScrollListener = () => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if(scrollableComponent) {
            scrollableComponent.addEventListener('scroll', this.loadOnScroll);
        }
    }

    removeScrollListener = () => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if(scrollableComponent) {
            scrollableComponent.removeEventListener('scroll', this.loadOnScroll);
        }
    }

    loadOnScroll = (event) => {
        const scrollableComponent = document.getElementById(this.props.scrollableComponent);
        if(!scrollableComponent) return;
        
        const isAtEnd = (
            scrollableComponent.clientHeight +  scrollableComponent.scrollTop 
                                                        >= scrollableComponent.scrollHeight - 10
        );
        if(isAtEnd){
            this.props.onEndAchive();
        }
    }
}