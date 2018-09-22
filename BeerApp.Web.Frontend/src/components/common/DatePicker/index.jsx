import React, { Component } from 'react';
import lodash from 'lodash';
import moment from 'moment';

const YEAR_SHIFT = 70;

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        let selectedMoment = moment(props.selected);
        if (!selectedMoment.isValid()) {
            selectedMoment = moment();
        }
        this.state = {
            day: selectedMoment.date(),
            month: selectedMoment.month() + 1,
            year: selectedMoment.year()
        };
        this.setYearRange(selectedMoment);
    }

    setYearRange() {
        const currentYear = moment().year();
        this.endYear = currentYear;
        this.startYear = currentYear - YEAR_SHIFT;
    }

    render() {
        return (
            <div className="date-picker">
                <span className="select is-info is-small">
                    <select
                        ref={node => { this.daySelect = node; }}
                        value={this.state.day}
                        onChange={this.handleChange}
                    >
                        {this.renderDayOptions()}
                    </select>
                </span>
                <div className="select is-info is-small">
                    <select
                        ref={node => { this.monthSelect = node; }}
                        value={this.state.month}
                        onChange={this.handleChange}
                    >
                        {this.renderMonthOptions()}
                    </select>
                </div>
                <div className="select is-info is-small">
                    <select
                        ref={node => { this.yearSelect = node; }}
                        value={this.state.year}
                        onChange={this.handleChange}
                    >
                        {this.renderYearOptions()}
                    </select>
                </div>
            </div>
        );
    }

    renderDayOptions() {
        return this.renderOptionsInRange(31);
    }

    renderMonthOptions() {
        return this.renderOptionsInRange(12);
    }

    renderYearOptions() {
        const { startYear, endYear } = this;

        return this.renderOptionsInRange(endYear, startYear);
    }

    renderOptionsInRange = (end, start = 0) =>
        lodash.range(start, end).map(value => {
            const currentValue = value + 1;

            return (
                <option key={currentValue} value={currentValue}>
                    {currentValue}
                </option>
            );
        });

    handleChange = () => {
        const day = this.daySelect.value;
        const month = this.monthSelect.value;
        const year = this.yearSelect.value;

        const validMoment = this.getValidMoment(year, month, day);

        this.setState({
            year,
            month,
            day: validMoment.date()
        });

        this.props.onChange(validMoment);
    }

    getValidMoment(year, month, day) {
        let validMoment = this.getMoment(year, month - 1, day);
        while (!validMoment.isValid()) {
            day -= 1;
            validMoment = this.getMoment(year, month - 1, day);
        }

        return validMoment;
    }

    getMoment = (year, month, day) => moment([year, month, day]);
}
