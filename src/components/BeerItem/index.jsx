import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { saveFavoriteChange } from '../../actions/actionCreators/favorites';

import './beer.css';

class BeerItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isFavorite: props.isFavorite };
    }

    componentDidUpdate() {
        this.props.saveFavoriteChange(this.props.id, this.state.isFavorite);
    }

    render() {
        const beerClass = classNames('beer', { 'beer--expanded': this.props.isExpanded });
        const favoriteButtonClass = classNames(
            'button',
            this.state.isFavorite ? 'is-primary' : 'is-light',
        );
        const taglineClass = classNames({ 'beer__tagline--expanded': this.props.isExpanded });
        const imageClass = classNames('beer__image', {
            'beer__image--expanded': this.props.isExpanded,
        });

        const favoriteButtonContent = this.state.isFavorite ? 'Remove Favorite' : 'Favorite';

        const description = this.props.isExpanded
            ? <p className="beer__description">{this.props.description}</p>
            : null;

        return (
            <div className="box">
                <article className={beerClass}>
                    <figure className="beer__image-container">
                        <img className={imageClass} src={this.props.imageUrl} alt="beer" />
                    </figure>
                    <div className="beer__about">
                        <div className="title is-4 beer__name">{this.props.name}</div>
                        <p className={taglineClass}>{this.props.tagline}</p>
                        {description}
                        <div className="field is-grouped is-grouped-multiline beer__buttons">
                            <div className="control">
                                <button className="button is-outlined is-link">Open</button>
                            </div>
                            <div className="control">
                                <button
                                    className={favoriteButtonClass}
                                    onClick={this.handleFavoriteButtonClick}
                                >
                                    {favoriteButtonContent}
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    handleFavoriteButtonClick = () => {
        this.setState({ isFavorite: !this.state.isFavorite });
    };
}

BeerItem = connect(null, { saveFavoriteChange })(BeerItem);

export default BeerItem;
