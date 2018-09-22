import React, { Component } from 'react';
import classNames from 'classnames';

import './simple-list.css';
import '../../common/styles/border.css';
import '../../common/styles/text-modifiers.css';

export default class SimpleList extends Component {
    render() {
        const { content, hasBorder } = this.props;
        const listClass = classNames(
            'simple-list',
            { 'with-border': hasBorder }
        );

        return (
            <ul className={listClass}>
                {content.map((item, index) => this.renderListItem(item, index))}
            </ul>
        );
    }

    renderListItem(item, index) {
        const { hasBorder } = this.props;
        const listItemClass = classNames(
            'simple-list__item',
            { 'simple-list__item--with-paddings': hasBorder },
            { 'with-top-border': hasBorder }
        );

        const { title, info } = item;
        const titleComponent = title
            ? <div className="simple-list__title is-capitalized">{title}</div>
            : null;

        return (
            <li key={index} className={listItemClass}>
                {titleComponent}
                <p className="simple-list__info">{info}</p>
            </li>
        );
    }
}
