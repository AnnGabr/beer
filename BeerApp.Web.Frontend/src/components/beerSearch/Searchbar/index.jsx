import React, { Component } from 'react';

import './searchbar.css';

export default class Searchbar extends Component {
    render() {
        return (
            <form className="field is-grouped searchbar">
                <span className="control is-expanded">
                    <input
                        ref={(node) => { this.input = node; }}
                        className="input"
                        type="text"
                        placeholder="Search beers..."
                        autoFocus
                    />
                </span>
                <span className="control">
                    <button
                        className="button is-info"
                        onClick={this.handleSearch}
                        onSubmit={this.handleSearch}
                        disabled={this.props.isDisabled}
                    >
                        <span className="material-icon" aria-hidden="true">
                            search
                        </span>
                    </button>
                </span>
            </form>
        );
    }

    handleSearch = (event) => {
        event.preventDefault();

        let enteredBeerName = null;
        if (this.input.value.trim() !== '') {
            enteredBeerName = this.input.value;
        }
        this.props.onSearch(enteredBeerName);
    };
}
