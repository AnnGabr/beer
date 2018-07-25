import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import './beer.css';

export class BeerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isFavorite: props.isFavorite
        };
    }

    render() {
        const beerClass = classNames('beer', { 'beer--expanded': this.props.isExpanded });

        return (
            <div className="box">
                <article className={beerClass}>
                    <figure className="beer__image-container">
                        {this.renderBeerImage()}
                    </figure>
                    <div className="beer__about">
                        {this.renderBeerName()}
                        {this.renderTagline()}
                        {this.renderDescription()}
                        <div className="field is-grouped is-grouped-multiline beer__buttons">
                            <div className="control">
                                {this.renderOpenButton()}
                            </div>
                            <div className="control">
                                {this.renderFavoriteButton()}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

    renderBeerImage() {
        const imageClass = classNames('beer__image', {
            'beer__image--expanded': this.props.isExpanded,
        });
        const { imageUrl, name } = this.props;

        return <img className={imageClass} src={imageUrl} alt={name} />;
    }

    renderBeerName() {
        return <div className="title is-4 beer__name">{this.props.name}</div>;
    }

    renderTagline() {
        const taglineClass = classNames('beer__tagline', { 'beer__tagline--expanded': this.props.isExpanded });

        return <p className={taglineClass}>{this.props.tagline}</p>;
    }

    renderDescription() {
        return this.props.isExpanded
            ? <p className="beer__description">{this.props.description}</p>
            : null;
    }

    renderOpenButton() {
        const { id } = this.props;

        return <Link to={`/beer/${id}`} className="button is-outlined is-link">Open</Link>;
    }

    renderFavoriteButton() {
        const { isLoading, isFavorite } = this.state;

        const favoriteButtonClass = classNames(
            'button',
            isFavorite ? 'is-primary' : 'is-light',
            isLoading && 'is-loading'
        );
        const favoriteButtonContent = isFavorite ? 'Remove Favorite' : 'Favorite';

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
        this.props.changeFavorite(this.props.apiId, this.state.isFavorite);

        this.setState({ isLoading: true });
    };
}
