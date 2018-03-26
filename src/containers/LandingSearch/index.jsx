import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter} from '../../components';

import {fetchSearchResult} from '../../actions/actionCreators/landingSearch';

const mapStateToProps = (state) => ({
    isSearchDisabled: state.landingBeerList.loading
});

class LandingSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {isFilterOpened: false};
    }

    render() {
        return (
            <div>
                <Searchbar 
                    onSearch={this.handleSearch}
                    isDisabled={this.props.isSearchDisabled}
                />
                {this.getFilter()}
            </div>
        )
    }

    handleSearch = (beerName) => {
        this.props.fetchSearchResult({
            beerName: beerName,
            filter: this.filter && this.filter.value
        })
        
        if(!this.state.isFilterOpened) {
            this.setState({isFilterOpened: true});
        }      
    }

    getFilter = () => (
        this.state.isFilterOpened
            ? <Filter ref={node => this.filter = node}/>
            :null
    )
}

LandingSearch = connect(mapStateToProps, { fetchSearchResult })(LandingSearch);

export default LandingSearch;