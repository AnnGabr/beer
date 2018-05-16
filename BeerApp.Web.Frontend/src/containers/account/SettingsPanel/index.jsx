import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ErrorField } from '../../../components';

import { getUser } from '../../../reducers/account';

import './settings-modal.css';
import './settings-box.css';

const mapStateToProps = state => ({
    user: getUser(state)
});

export class SignInForm extends Component {
    render() {
        return (
            <section className="container settings-modal has-text-centered">
                <h3 className="title has-text-grey settings-modal__title">Profile</h3>
                <p className="subtitle has-text-grey settings-modal__subtitle">
                    B e e r C a t a l o g
                </p>
                <div className="settings-modal__profile-settings profile-settings">
                    <div className="box profile-settings__avatar">

                    </div>
                    <div className="box profile-settings__user-info">

                    </div>
                    <button className="button is-large profile-settings__save-button" onClick={this.handleSaveClick}>
                        Save
                    </button>
                </div>
            </section>
        );
    }

    renderErrorField = () => (
        <ErrorField errors={this.props.validationErrors}/>
    )

    renderPasswordInput = () => (
        <input
            ref={ node => this.passwordInput = node }
            className="input is-large"
            type="password"
            placeholder="Your Password"
            required
        />
    )

    handleSaveClick = (e) => {
        e.preventDefault();
    }
}

export default withRouter(connect(mapStateToProps)(SignInForm));
