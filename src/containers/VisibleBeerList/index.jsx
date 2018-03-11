import React, { Component } from 'react';
import { connect } from "react-redux";

import {BeerList, Loader} from '../../components';

import './beer-list-wrapper.css';

const mapStateToProps = state => {
    return { ...state.beerList };
};

class VisibleBeerList extends Component {
    constructor(props){
        super(props);

        this.loadOnScroll = this.loadOnScroll.bind(this);
    }

    componentWillMount() {
        //event
    }

    componentDidMount() {
        window.addEventListener('scroll', this.loadOnScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadOnScroll);
    }

    loadOnScroll(event) {
        //if(this.state.currentCount == this.state.total) return;

        let lastItem = document.getElementById('content-end');
        if(!lastItem) return;

        let rect = lastItem.getBoundingClientRect();
        let isAtEnd = (
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
        );

        if(isAtEnd){
            console.log('isAtEnd');
            if(this.props.loading) return;
            //event
        }
    }

    render() {
        if(this.props.error !== null) {
            return (
                <div className="beer-list">
                    <div className="title">Try later =(</div>
                    <div className="subtitle">{this.props.error}</div>
                </div>
            )
        }

        return (
            <div className="beer-list-wrapper">
                <BeerList beers = {this.props.beers}/>
                <Loader variant="content-end" loading={this.props.loading}/>
            </div>
        )    
    }
}

VisibleBeerList = connect(mapStateToProps)(VisibleBeerList);

export default VisibleBeerList;