import React, { Component } from 'react';
import classNames from 'classnames';

export default class BeerList extends Component {
    render() {
        const { beers, isColumnList, BeerItem } = this.props;
        const listItemClass = classNames('column', isColumnList ? 'is-two-thirds' : 'is-one-third');

        return (
            <ul className="columns is-multiline beer-list">
                {beers.map(beer => (
                    <li key={beer.punkId} className={listItemClass}>
                        <BeerItem
                            {...beer}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}
