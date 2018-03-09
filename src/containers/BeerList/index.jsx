import React, {Component} from 'react';
import {BeerItem} from '../../components';
import './beer-list.css';
import './loader.css';

export default class BeerList extends Component {
    render() {
        let beers = this.props.beers.map((beer) => (
            <li key={beer.id} className="column is-one-third">
                <BeerItem
                    id={beer.id}
                    imgUrl={beer.imgUrl}
                    name={beer.name}
                    tweet={beer.tweet}
                />
            </li>
        ));
        beers.push(
            <li key="-1" className="column is-12 loader-wrapper">
                <div className="list-loader" />
            </li>
        );

        return (
            <ul className="columns is-multiline beer-list is-warning">
                {beers}
            </ul>
        )    
    }
}