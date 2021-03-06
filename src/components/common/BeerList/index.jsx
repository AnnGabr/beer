import React, { Component } from 'react';
import classNames from 'classnames';

import BeerItem from '../BeerItem';

export default class BeerList extends Component {
    render() {
        const { beers, isColumnList, isExpanded } = this.props;
        const listItemClass = classNames('column', isColumnList ? 'is-two-thirds' : 'is-one-third');

        return (
            <ul className="columns is-multiline beer-list">
                {beers.map(beer => (
                    <li key={beer.id} className={listItemClass}>
                        <BeerItem
                            {...beer}
                            isExpanded={isExpanded}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}
