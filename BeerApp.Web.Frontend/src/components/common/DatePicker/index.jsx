import React, { Component } from 'react';
import lodash from 'lodash';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.date = props.date || new Date();
    }

    render() {
        return (
            <div className="date-picker">
                <span className="select is-info is-small">
                    <select>
                        {this.renderDayOptions()}
                    </select>
                </span>
                <div className="select is-info is-small">
                    <select>
                        {this.renderMonthOptions()}
                    </select>
                </div>
                <div className="select is-info is-small">
                    <select >
                        {this.renderYearOptions()}
                    </select>
                </div>
            </div>
        );
    }

    renderDayOptions() {
        const day = this.date.getUTCDate();

        return this.renderOptionsInRange(31, day);
    }

    renderMonthOptions() {
        const month = this.date.getUTCMonth() + 1;

        return this.renderOptionsInRange(12, month);
    }

    renderYearOptions() {
        const year = this.date.getUTCFullYear();

        return this.renderOptionsInRange(year, year, year - 40);
    }

    renderOptionsInRange = (end, selectedValue, start = 0) =>
        lodash.range(start, end).map((value) => {
            const currentValue = value + 1;
            const isSelected = currentValue === selectedValue;

            return (
                <option key={currentValue} value={currentValue} selected={isSelected}>
                    {currentValue}
                </option>
            );
        });

    handleSelectChange = (e) => {
       
    }
}

