import React, { Component } from 'react';
import classNames from 'classnames';

import './properties-list.css';
import './tooltip.css';
import './property.css';
import '../common/styles/border.css';

export default class PropertiesList extends Component {
    render() {
        const { content } = this.props;

        return (
            <ul className="properties-list with-border">
                {content.map((item, index) => this.renderListItem(item, index))}
            </ul>
        );
    }

    renderListItem(item, index) {
        const { name, tooltipText, value } = item;

        return (
            <li key={index} className="properties-list__item with-top-border property">
                <div className="property__name-tooltip">
                    <span className="property__name">{name}</span>
                    <div className="tooltip property__tooltip">
                        <div className="tooltip__text">{tooltipText}</div>
                        <span className="material-icon tooltip__icon">info_outline</span>
                    </div>
                </div>
                <span className="property__value">{value}</span>
            </li>
        );
    }
}
