import React, {Component} from 'react';
import './searchbar.css';

export default class Searchbar extends Component {
    render() {
        return (
            <div className="field is-grouped searchbar">
                <span className="control is-expanded">
                    <input className="input" type="text" placeholder="Beer..." />
                </span>
                <span className="control">
                    <button className="button is-info" onClick={this.props.onSearch}>
                        Search
                    </button>
                </span>
            </div>
        )
    }
}