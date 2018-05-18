import React, { Component } from 'react';
import lodash from 'lodash';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        const date = props.date || new Date();
        this.state = {
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear()
        };
    }

    render() {
        return (
            <div className="date-picker">
                <span className="select is-info is-small">
                    <select value={this.state.day} onChange={this.handleDayChange}>
                        {this.renderDayOptions()}
                    </select>
                </span>
                <div className="select is-info is-small">
                    <select value={this.state.month} onChange={this.handleMonthChange}>
                        {this.renderMonthOptions()}
                    </select>
                </div>
                <div className="select is-info is-small">
                    <select value={this.state.year} onChange={this.handleYearChange}>
                        {this.renderYearOptions()}
                    </select>
                </div>
            </div>
        );
    }

    renderDayOptions() {
        const { day } = this.state;

        return this.renderOptionsInRange(31, day);
    }

    renderMonthOptions() {
        const { month } = this.state;

        return this.renderOptionsInRange(12, month);
    }

    renderYearOptions() {
        const { year } = this.state;

        return this.renderOptionsInRange(year, year, year - 40);
    }

    renderOptionsInRange = (end, selectedValue, start = 0) =>
        lodash.range(start, end).map((value) => {
            const currentValue = value + 1;

            return (
                <option key={currentValue} value={currentValue}>
                    {currentValue}
                </option>
            );
        });

    handleDayChange = (e) => {
        this.setState({ day: Number(e.target.value) });
    }

    handleMonthChange = (e) => {
        this.setState({ month: Number(e.target.value) });
    }

    handleYearChange = (e) => {
        this.setState({ year: Number(e.target.value) });
    }
}

