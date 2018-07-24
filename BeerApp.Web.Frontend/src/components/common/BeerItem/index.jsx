import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { isFavorite } from '../../../reducers/favorites';
import { saveFavoriteChange } from '../../../actions/actionCreators/favorites';

import classNames from 'classnames';
import './beer.css';

const mapStateToProps = (state, ownProps) => ({
    isFavorite: isFavorite(state, ownProps.punkId)
});

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
        const favoriteButtonClass = classNames(
            'button',
            this.state.isFavorite ? 'is-primary' : 'is-light',
        );
        const favoriteButtonContent = this.state.isFavorite ? 'Remove Favorite' : 'Favorite';

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

export default connect(mapStateToProps, { saveFavoriteChange })(BeerItem);
