import React, {Component} from 'react';
import { connect } from "react-redux";

import { saveFavoriteChange } from '../../actions/actionCreators/favorites';

import classNames from 'classnames';
import './beer.css';

class BeerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {isFavorite: props.isFavorite};
    }

    componentDidUpdate() {
        this.props.saveFavoriteChange(this.props.id, this.state.isFavorite);
    }

    handleFavoriteClick = () => {
        this.setState({isFavorite: !this.state.isFavorite});
    }

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
                            <button 
                                className={classNames('button', 'is-light', {'is-primary': this.state.isFavorite})}
                                onClick={this.handleFavoriteClick}>
                                {this.state.isFavorite ? 'Remove Favorite': 'Favorite'}
                            </button> 
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

BeerItem = connect(null, { saveFavoriteChange })(BeerItem);

export default BeerItem;
