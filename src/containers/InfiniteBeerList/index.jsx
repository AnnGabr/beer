import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBeers, requestTypes, receiveBeers, requestBeers } from '../../actions/actionCreators/beerList';
import { BeerList, Loader } from '../../components';
import { MAIN_CONTENT_SELECTOR } from '../../constants';
import './beer-list-wrapper.css';

let PAGE = 1;

function retriveIdNameImgTagline(serverResponse){
    serverResponse = JSON.parse(serverResponse);
    let beers = [];
    if(Array.isArray(serverResponse)){
        beers = serverResponse.map((beer) => ({
            id: beer.id,
            image_url: beer.image_url,
            name: beer.name,
            tagline: beer.tagline
        }));
    }
    
    return beers;
}

const mapDispatchToProps = {
    receiveBeers,
    requestBeers
};

const mapStateToProps = state => {
    return { ...state.beerList };
};

class InfiniteBeerList extends Component {

    componentDidMount() {
        this.props.requestBeers();
        const request = {
            urlParams: {
                page: PAGE,
                perPage: 9,
            },
            type: requestTypes.GET_BEERS
        }
        fetchBeers(request)
            .then((response) => {
                this.props.receiveBeers(retriveIdNameImgTagline(response))
            })
            .catch((error) => console.log(error));
        PAGE += 1;

        let mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        mainContent.addEventListener('scroll', this.loadOnScroll);
    }

    componentWillUnmount() {
        let mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        mainContent.addEventListener('scroll', this.loadOnScroll);
    }

    loadOnScroll = (event) => {
        let mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(!mainContent) return;
        
        let isAtEnd = (
            mainContent.clientHeight +  mainContent.scrollTop >= mainContent.scrollHeight - 10
        );

        if(isAtEnd){
            console.log('isAtEnd');
            if(this.props.loading) return;

            this.props.requestBeers();
            const request = {
                urlParams: {
                    page: PAGE,
                    perPage: 9,
                },
                type: requestTypes.GET_BEERS
            }
            fetchBeers(request)
            .then((response) => {
                this.props.receiveBeers(retriveIdNameImgTagline(response))
            })
            .catch((error) => console.log(error));
            PAGE += 1;
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
                <Loader loading={this.props.loading}/>
            </div>
        )    
    }
}

InfiniteBeerList = connect(mapStateToProps, mapDispatchToProps)(InfiniteBeerList);

export default InfiniteBeerList;