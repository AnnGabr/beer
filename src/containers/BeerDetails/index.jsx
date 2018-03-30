import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SimpleList, PropertiesList, ComponentWithHeader } from '../../components';

const test = [{
    title: 'Ludo',
    info: 'from the values set in \nthe previous file',
},
{
    title: 'Daspo',
    info: 'from the values set in the previous file',
},
{
    title: 'Uget',
    info: 'from the values set in the previous file',
}];

const test2 = [{
    name: 'Ludo',
    tooltipText: 'from the values set in \nthe previous file',
    value: '6'
},
{
    name: 'Daspo',
    tooltipText: 'from the values set in the previous file',
},
{
    name: 'Uget',
    tooltipText: 'from the values set in the previous file',
}];

class BeerDetails extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;
    }

    render() {
        const { some } = this.props;

        return (
            <section className="section container">
                <ComponentWithHeader headerText="Properties">
                    <PropertiesList content={test2}/>
                </ComponentWithHeader>
                <ComponentWithHeader headerText="Food Paring">
                    <SimpleList content={test} />
                </ComponentWithHeader>
            </section>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
