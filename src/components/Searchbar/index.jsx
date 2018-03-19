import React, {Component} from 'react';

import './searchbar.css';

export default class Searchbar extends Component {   
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
        this.props.onSearch(beerName);
    }
}