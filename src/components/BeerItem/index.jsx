import React, {Component} from 'react';
import './beer.css';

export default class BeerItem extends Component {
    render() {
        return (
            <article className="box beer" >
                <img className="beer__image" src={this.props.image_url} height="200" alt="beer" />
                <div className="beer__content">
                    <div className="title is-4 beer__name">{this.props.name}</div>
                    <p className="beer__tagline">{this.props.tagline}</p>
                    <div className="field is-grouped is-grouped-multiline">
                        <div className="control">
                            <button className="button is-outlined is-link">Open</button>
                        </div>
                        <div className="control">
                            <button className="button is-light">Favorite</button> 
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}