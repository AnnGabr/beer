import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

export default class PagingPanel extends Component {
    constructor(props) {
        super(props);

        this.interval = props.interval || 5;
        this.startPageNumber = props.startPageNumber || 1;
        this.state = {
            activePageNumber: props.activePageNumber || 1,
            visibleStartPageNumber: this.getVisibleStartPageNumber()
        };
    }

    getVisibleStartPageNumber() {
        const {interval, startPageNumber} = this;
        const activePageNumber = this.props.activePageNumber;

        let visibleStartPageNumber = startPageNumber;
        while(visibleStartPageNumber + interval < activePageNumber) {
            visibleStartPageNumber += interval;
        }

        return visibleStartPageNumber;
    }

    render() {
        return (
            <div className="buttons has-addons is-centered">
                {this.getLeftArrow()}
                {this.getPageLinks()}
                {this.getRightArrow()}
            </div>
        );
    }

    getLeftArrow = () => (
        this.props.totalPagesCount > 5 
            && (
                <button
                    className="button" 
                    onClick={this.handlePreviousPagesClick}>
                    <i className="material-icon" aria-hidden="true">chevron_left</i>
                </button>
            )
    )

    handlePreviousPagesClick = () => {
        let newVisibleStartPageNumber = this.state.visibleStartPageNumber - this.interval;
        newVisibleStartPageNumber = newVisibleStartPageNumber > this.startPageNumber
            ? newVisibleStartPageNumber
            : this.startPageNumber;

        this.setState({visibleStartPageNumber: newVisibleStartPageNumber});
    }

    getPageLinks() {
        const totalPagesCount = this.props.totalPagesCount;
        if(totalPagesCount < 2) { return; }

        const {visibleStartPageNumber, activePageNumber} = this.state;

        const visibleEndPageNumber = visibleStartPageNumber + this.interval - 1;
        let links = []; 
        for(let i = visibleStartPageNumber; i <= visibleEndPageNumber && i <= totalPagesCount ; i++) {
            const buttonClass = classNames(
                'button', 
                {'is-info': i === activePageNumber}
            );
            links.push(
                <Link to={`/favorites/page=${i}`}
                    key={i} 
                    className={buttonClass}
                    onClick={this.handleOnPageLinkClick.bind(this, i)}>
                    {i}
                </Link>
            );
        }

        return links;
    }

    handleOnPageLinkClick = (pageNumber) => {
        this.setState({activePageNumber: pageNumber});

        this.props.onClick(pageNumber);
    }

    getRightArrow = () => {
        const needRightArrow = (
            this.props.totalPagesCount - this.interval >= this.state.visibleStartPageNumber 
        );
         
        return ( 
            needRightArrow
            ? (                
                <button
                    className="button" 
                    onClick={this.handleNextPagesClick}>
                    <i className="material-icon" aria-hidden="true">chevron_right</i>
                </button>
            )
            :null
        );
    }

    handleNextPagesClick = () => {
        this.setState({
            visibleStartPageNumber: this.state.visibleStartPageNumber + this.interval
        });
    }
}