import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

export default class PagingPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleStartPageNumber: this.getVisibleStartPageNumber(),
        };
    }

    getVisibleStartPageNumber() {
        const { activePageNumber, interval, startPageNumber } = this.props;

        let visibleStartPageNumber = startPageNumber;
        while (visibleStartPageNumber + interval <= activePageNumber) {
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
        const { interval, startPageNumber } = this.props;
        const needLeftArrow =
            this.state.visibleStartPageNumber >= interval + startPageNumber;

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
        const { interval, startPageNumber } = this.props;
        let newVisibleStartPageNumber = this.state.visibleStartPageNumber - interval;

        newVisibleStartPageNumber =
            newVisibleStartPageNumber > startPageNumber
                ? newVisibleStartPageNumber
                : startPageNumber;

        this.setState({ visibleStartPageNumber: newVisibleStartPageNumber });
    };

    getPageLinks() {
        const { totalPagesCount, activePageNumber, interval } = this.props;
        if (totalPagesCount < 2) {
            return;
        }

        const { visibleStartPageNumber } = this.state;

        const visibleEndPageNumber = visibleStartPageNumber + interval - 1;
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
        const { interval, totalPagesCount } = this.props;
        const needRightArrow =
            totalPagesCount - interval >= this.state.visibleStartPageNumber;

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
            visibleStartPageNumber: this.state.visibleStartPageNumber + this.props.interval,
        });
    };
}
