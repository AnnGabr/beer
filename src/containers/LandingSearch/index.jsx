import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Searchbar, Filter} from '../../components';

import {fetchSearchResult} from '../../actions/actionCreators/landingSearch';

class LandingSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {isFilterOpened: false};
    }

    render() {
        const filter = this.state.isFilterOpened
            ? <Filter ref={node => this.filter = node}/>
            :null;

        return (
            <div>
                <Searchbar onSearch={this.handleSearch}/>
                {filter}
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
}

LandingSearch = connect(null, { fetchSearchResult })(LandingSearch);

export default LandingSearch;