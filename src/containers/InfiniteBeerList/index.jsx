import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBeers, requestTypes, receiveBeers, requestBeers } from '../../actions/actionCreators/beerList';
import { BeerList, Loader } from '../../components';
import { MAIN_CONTENT_SELECTOR } from '../../constants';
import { retriveIdNameImgTagline } from '../../utils/beers-filters';
import './beer-list-wrapper.css';

let PAGE = 1;

const mapDispatchToProps = {
    receiveBeers,
    requestBeers
};

const mapStateToProps = state => {
    return { ...state.beerList };
};

class InfiniteBeerList extends Component {

    componentDidMount() {
        //test
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
        //test
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
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

    addScrollListener = () => {
        let mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(mainContent) {
            mainContent.addEventListener('scroll', this.loadOnScroll);
        }
    }

    removeScrollListener = () => {
        let mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(mainContent) {
            mainContent.removeEventListener('scroll', this.loadOnScroll);
        }
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
            //test
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
            //test
        }
    }
}

InfiniteBeerList = connect(mapStateToProps, mapDispatchToProps)(InfiniteBeerList);

export default InfiniteBeerList;