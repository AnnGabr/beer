import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class BeerDetails extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { match } = this.props;
        //TODO fetch
    }

    render() {
        return (
            <section className="section container paged-list">
                details
            </section>
        );    
    }
}

export default withRouter(connect()(BeerDetails));
