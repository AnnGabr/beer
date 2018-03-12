import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchBeers, receiveBeers, requestBeers } from '../../actions/actionCreators/beerList';
import { BeerList, Loader } from '../../components';
import { MAIN_CONTENT_SELECTOR } from '../../constants';
import { retriveIdNameImgTagline } from '../../utils/beers-filters';
import './beer-list-wrapper.css';

const mapDispatchToProps = {
    receiveBeers,
    requestBeers
};

const mapStateToProps = state => ({ 
    ...state.beerList, request: state.request 
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
        const { request, receiveBeers } = this.props;
        this.props.requestBeers();
        fetchBeers(request)
            .then((response) => {
                receiveBeers(retriveIdNameImgTagline(response))
            })
            .catch((error) => console.log(error));
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
            //console.log('isAtEnd');
            if(this.props.loading) return;
            this.fetchData();
        }
    }
}

InfiniteBeerList = connect(mapStateToProps, mapDispatchToProps)(InfiniteBeerList);

export default InfiniteBeerList;