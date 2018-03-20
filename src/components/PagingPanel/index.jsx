import React, { Component } from 'react';

import classNames from 'classnames';
import uuid from 'random-uuid-v4';

export default class PagingPanel extends Component {
    constructor(props) {
        super(props);

        this.gap = this.props.gap || 5;
        this.startPage = this.props.startPage || 1;
        this.state = {
            active: this.props.active || 1,
            visibleStartPage: this.props.startPage || 1
        };
    }

    render() {
        return (
            <div className="buttons has-addons is-centered">
                {this.getArrowLeft()}
                {this.getPagesGroup()}
                {this.getArrowRight()}
            </div>
        );
    }

    getArrowLeft = () => this.props.count > 5 && (
        <button
            className="button" 
            onClick={this.handlePreviousPagesClick}>
            <i className="material-icon" aria-hidden="true">chevron_left</i>
        </button>
    )

    handlePreviousPagesClick = () => {
        let newVisibleStartPage = this.state.visibleStartPage - this.gap;
        newVisibleStartPage = newVisibleStartPage > this.startPage ? 
                                    newVisibleStartPage : this.startPage;

        this.setState({visibleStartPage: newVisibleStartPage});
    }

    getPagesGroup() {
        const pagesCount = this.props.count;

        if(pagesCount < 2) return;

        const {visibleStartPage, active} = this.state;

        let group = []; 
        for(let i = visibleStartPage; (i < visibleStartPage + this.gap) && i <= pagesCount ; i++) {
            const buttonClass = classNames('button', {'is-info': i === active});
            group.push(
                <button
                    key={(i === active) ? uuid() : i} 
                    className={buttonClass}
                    onClick={this.handleOnPageClick}>
                    {i}
                </button>
            );
        }

        return group;
    }

    handleOnPageClick = (event) => {
        this.setState({active: +event.target.textContent});

        this.props.onClick(+event.target.textContent);
    }

    getArrowRight = () => this.props.count - this.gap >= this.state.visibleStartPage && (
        <button
            className="button" 
            onClick={this.handleNextPagesClick}>
            <i className="material-icon" aria-hidden="true">chevron_right</i>
        </button>
    )

    handleNextPagesClick = () => {
        this.setState({visibleStartPage: this.state.visibleStartPage + this.gap});
    }
}