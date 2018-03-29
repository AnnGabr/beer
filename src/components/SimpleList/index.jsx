import React, { Component } from 'react';
import classNames from 'classnames';

import './simple-list.css';

export default class SimpleList extends Component {
    render() {
        const { content, hasBorder } = this.props;
        const listClass = classNames(
            'simple-list',
            { 'simple-list--with-border': hasBorder }
        );

        return (
            <ul className={listClass}>
                {content.map(item => this.renderListItem(item))}
            </ul>
        );
    }

    renderListItem(item) {
        const { hasBorder } = this.props;
        const listItemClass = classNames(
            'simple-list__item',
            { 'simple-list__item--with-border': hasBorder }
        );

        const { title, info } = item;
        const titleComponent = title
            ? <div className="simple-list__title">{title}</div>
            : null;

        return (
            <li key={title} className={listItemClass}>
                {titleComponent}
                <p className="simple-list__info">{info}</p>
            </li>
        );
    }
}
