import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import '../common/styles/text-modifiers.css';

import { saveFavoriteChange } from '../../actions/actionCreators/favorites';

export class BeerMainInfo extends Component {
    constructor(props) {
        super(props);

        this.state = { isFavorite: props.isFavorite };
    }

    componentDidUpdate() {
        this.props.saveFavoriteChange(this.props.id, this.state.isFavorite);
    }

    render() {
        const beerClass = classNames('beer', 'beer--expanded');

        return (
            <article className={beerClass}>
                <div className="beer__about is-paddingless">
                    {this.renderBeerName()}
                    {this.renderTagline()}
                    <div className="beer__button control">{this.renderFavoriteButton()}</div>
                    {this.renderDescription()}
                </div>
                <figure className="beer__image-container">
                    {this.renderBeerImage()}
                </figure>
            </article>
        );
    }

    renderBeerImage() {
        const imageClass = classNames('beer__image', 'beer__image--expanded');
        const { imageUrl, name } = this.props;

        return <img className={imageClass} src={imageUrl} alt={name} />;
    }

    renderBeerName() {
        return <div className="title is-2 beer__name">{this.props.name}</div>;
    }

    renderTagline() {
        const taglineClass = classNames('beer__tagline', 'beer__tagline--expanded', 'is-italic', 'is-uppercase');

        return <p className={taglineClass}>{this.props.tagline}</p>;
    }

    renderDescription() {
        return <p className="beer__description">{this.props.description}</p>;
    }

    renderFavoriteButton() {
        const favoriteButtonClass = classNames(
            'button',
            'is-uppercase',
            this.state.isFavorite ? 'is-primary' : 'is-warning',
        );
        const favoriteButtonContent = this.state.isFavorite ? 'Remove from Favorite' : 'Add to Favorite';

        return (
            <button
                className={favoriteButtonClass}
                onClick={this.handleFavoriteButtonClick}
            >
                {favoriteButtonContent}
            </button>
        );
    }

    handleFavoriteButtonClick = () => {
        this.setState({ isFavorite: !this.state.isFavorite });
    };
}

export default connect(null, { saveFavoriteChange })(BeerMainInfo);

