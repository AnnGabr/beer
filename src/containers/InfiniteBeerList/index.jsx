import React, { Component } from 'react';
import { connect } from "react-redux";

import { setRequest } from '../../actions/actionCreators/request';
import { fetchBeers, resetBeers } from '../../actions/actionCreators/beerList';
import { requestTypes } from '../../utils/api';
import { mapToLandingModels } from '../../utils/beers-filters';

import { BeerList, Loader } from '../../components';

import { MAIN_CONTENT_SELECTOR } from '../../constants';
import './beer-list-wrapper.css';

class InfiniteBeerList extends Component {
    componentDidMount() {
        this.props.setRequest({
            type: requestTypes.GET_BY_NAME,
            urlParams: {
                page: 1,
                perPage: this.props.perPage
            }
        });
        this.props.resetBeers();
        this.fetchData();
        
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
    }

    fetchData() {
        this.props.fetchBeers(mapToLandingModels);
    }
    
    render() {
        const {beers, loading} = this.props;
        return (
            <div className="beer-list-wrapper">
                <BeerList beers={beers} />
                <Loader loading={loading}/>
            </div>
        )    
    }

    addScrollListener = () => {
        const mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(mainContent) {
            mainContent.addEventListener('scroll', this.loadOnScroll);
        }
    }

    removeScrollListener = () => {
        const mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(mainContent) {
            mainContent.removeEventListener('scroll', this.loadOnScroll);
        }
    }

    loadOnScroll = (event) => {
        const mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
        if(!mainContent) return;
        
        const isAtEnd = (
            mainContent.clientHeight +  mainContent.scrollTop >= mainContent.scrollHeight - 10
        );
        if(isAtEnd){
            this.fetchData();
        }
    }
}

InfiniteBeerList = connect(null, { fetchBeers, setRequest, resetBeers })(InfiniteBeerList);

export default InfiniteBeerList;