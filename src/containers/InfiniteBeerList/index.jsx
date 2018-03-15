import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBeers } from '../../actions/actionCreators/beerList';
import { BeerList, Loader } from '../../components';
import { MAIN_CONTENT_SELECTOR } from '../../constants';
import { retrieveMain } from '../../utils/beers-filters';
import './beer-list-wrapper.css';

class InfiniteBeerList extends Component {

    componentDidMount() {
        this.fetchData();
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
    }

    fetchData() {
        this.props.fetchBeers(retrieveMain);
    }

    render() {
        const {beers, loading} = this.props;
        return (
            <div className="beer-list-wrapper">
                <BeerList 
                    beers={beers} 
                    isColumnList={this.props.isColumnList}
                    isExpanded={this.props.isExpanded}
                />
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

InfiniteBeerList = connect(null, { fetchBeers })(InfiniteBeerList);

export default InfiniteBeerList;