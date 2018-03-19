import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setRequest } from '../../actions/actionCreators/request';

import './searchbar.css';

class Searchbar extends Component {   
    render() {
        return (
            <form className="field is-grouped searchbar">
                <span className="control is-expanded">
                    <input 
                        ref={node => { this.input = node }} 
                        className="input" type="text" placeholder="Search beers..." />
                </span>
                <span className="control">
                    <button 
                        className="button is-info" 
                        onClick={this.handleSearch} 
                        onSubmit={this.handleSearch}>
                        Search
                    </button>
                </span>
            </form>
        )
    }

    handleSearch = (event) => {
        event.preventDefault();

        let beerName = null;
        if(this.input.value.trim() !== '') {
            beerName = this.input.value;
        }
        this.props.setRequest({
            urlParams: {
                name: beerName,
                page: 1
            }
        });
        this.props.onSearch();
    }
}

Searchbar = connect(null, { setRequest })(Searchbar);

export default Searchbar;