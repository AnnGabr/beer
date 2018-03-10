import React, { Component } from 'react';
import { connect } from "react-redux";

import { BeerItem } from '../../components';

import './beer-list.css';
import './loader.css';

const mapStateToProps = state => {
    return { ...state.beerList };
};

class BeerList extends Component {
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

        let beers = this.props.beers.map((beer) => (
            <li key={beer.id} className="column is-one-third">
                <BeerItem {...beer} />
            </li>
        ));
        beers.push(
            <li key="-1" 
                className="column is-12 loader-wrapper content-end" 
                style={{display: this.props.loading ? 'inline-block':'none'}}>
                <div className="list-loader" />
            </li>
        )

        return (
            <ul className="columns is-multiline beer-list is-warning">
                {beers}
            </ul>
        )    
    }
}

const ConnectedBeerList = connect(mapStateToProps)(BeerList);

export default ConnectedBeerList;