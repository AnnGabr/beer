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
        const beerContentClass = classNames(
            'beer-content',
            {'beer-content--expanded': this.props.isExpanded}
        );
        const buttonFavoriteClass = classNames(
            'button',
            this.state.isFavorite ? 'is-primary' : 'is-light'
        );
        const taglineClass = classNames(
            'beer__tagline',
            {'subtitle': this.props.isExpanded},
            {'beer__tagline--expanded': this.props.isExpanded}
        );
        const imageClass = classNames(
            'beer__image',
            {'beer__image--expanded': this.props.isExpanded}
        );

        const imageContainerClass = classNames(
            'beer__image-container',
            {'beer__image-container--expanded': this.props.isExpanded}
        );

        return (
            <article className='box beer' >
                <div className={beerContentClass}>
                    <figure className={imageContainerClass}>
                        <img className={imageClass} src={this.props.image_url} alt="beer" />
                    </figure>
                    <div className="beer__about">
                        <div className="title is-4 beer__name">
                            {this.props.name}
                        </div>
                        <p className={taglineClass}>
                            {this.props.tagline}
                        </p>
                        { this.props.isExpanded && (<p>{this.props.description}</p>)}
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control">
                                <button className="button is-outlined is-link">Open</button>
                            </div>
                            <div className="control">
                                <button 
                                    className={buttonFavoriteClass}
                                    onClick={this.handleFavoriteClick}>
                                    {this.state.isFavorite ? 'Remove Favorite': 'Favorite'}
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

BeerItem = connect(null, { saveFavoriteChange })(BeerItem);

export default BeerItem;
