import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBeers } from '../../actions/actionCreators/beerList';
import { BeerList, Loader } from '../../components';
import { MAIN_CONTENT_SELECTOR, SEARCH_FAIL_MESSAGE } from '../../constants';
import './beer-list-wrapper.css';

const mapStateToProps = state => ({
    ...state.beerList
});

class InfiniteBeerList extends Component {

    componentDidMount() {
        this.fetchData();
        this.addScrollListener();
    }

    componentWillUnmount() {
        this.removeScrollListener();
    }

    fetchData() {
        this.props.fetchBeers();
    }

    render() {
        if(this.props.error !== null) {
            const {message, code} = this.props.error;
            return (
                <div className="beer-list">
                    <div className="title">
                        {SEARCH_FAIL_MESSAGE}
                        {`Error code: ${code}`}
                    </div>
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

InfiniteBeerList = connect(mapStateToProps, { fetchBeers })(InfiniteBeerList);

export default InfiniteBeerList;