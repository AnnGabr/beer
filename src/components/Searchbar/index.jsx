import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setRequest } from '../../actions/actionCreators/request';
import { requestTypes } from '../../utils/api';

import './searchbar.css';

class Searchbar extends Component {
    handleSearch = (event) => {
        event.preventDefault();
        //test
        if(this.input.value.trim() !== ''){
            this.props.setRequest();
        }
        else{
            this.props.setRequest({type: requestTypes.GET_BY_NAME, urlParams: {name: this.input.value || ''}});
        }
        //test
        this.props.onSearch();
    }

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
}

Searchbar = connect(null, { setRequest })(Searchbar);

export default Searchbar;