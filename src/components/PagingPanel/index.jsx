import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

export default class PagingPanel extends Component {
    constructor(props) {
        super(props);

        this.interval = props.interval || 5;
        this.startPageNumber = props.startPageNumber || 1;
        this.state = {
            visibleStartPageNumber: this.getVisibleStartPageNumber(),
        };
    }

    getVisibleStartPageNumber() {
        const { interval, startPageNumber } = this;
        const { activePageNumber } = this.props;

        let visibleStartPageNumber = startPageNumber;
        while (visibleStartPageNumber + interval < activePageNumber) {
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

    getLeftArrow = () => {
        const needLeftArrow =
            this.state.visibleStartPageNumber >= this.interval + this.startPageNumber;

        return needLeftArrow
            ? (
                <button className="button" onClick={this.handlePreviousPagesClick}>
                    <i className="material-icon" aria-hidden="true">
                        chevron_left
                    </i>
                </button>
            )
            : null;
    };

    handlePreviousPagesClick = () => {
        let newVisibleStartPageNumber = this.state.visibleStartPageNumber - this.interval;
        newVisibleStartPageNumber =
            newVisibleStartPageNumber > this.startPageNumber
                ? newVisibleStartPageNumber
                : this.startPageNumber;

        this.setState({ visibleStartPageNumber: newVisibleStartPageNumber });
    };

    getPageLinks() {
        const { totalPagesCount, activePageNumber } = this.props;
        if (totalPagesCount < 2) {
            return;
        }

        const { visibleStartPageNumber } = this.state;

        const visibleEndPageNumber = visibleStartPageNumber + this.interval - 1;
        const links = [];
        for (
            let pageNumber = visibleStartPageNumber;
            pageNumber <= visibleEndPageNumber && pageNumber <= totalPagesCount;
            pageNumber++
        ) {
            const buttonClass = classNames('button', {
                'is-info': pageNumber === activePageNumber,
            });
            links.push(
                <Link
                    to={`page=${pageNumber}`}
                    key={pageNumber}
                    className={buttonClass}
                    onClick={this.handleOnPageLinkClick.bind(this, pageNumber)}
                >
                    {pageNumber}
                </Link>
            );
        }

        return links;
    }

    handleOnPageLinkClick = (pageNumber) => {
        if (this.props.onClick) {
            this.props.onClick(pageNumber);
        }
    };

    getRightArrow = () => {
        const needRightArrow =
            this.props.totalPagesCount - this.interval >= this.state.visibleStartPageNumber;

        return needRightArrow
            ? (
                <button className="button" onClick={this.handleNextPagesClick}>
                    <i className="material-icon" aria-hidden="true">
                        chevron_right
                    </i>
                </button>
            )
            : null;
    };

    handleNextPagesClick = () => {
        this.setState({
            visibleStartPageNumber: this.state.visibleStartPageNumber + this.interval,
        });
    };
}
