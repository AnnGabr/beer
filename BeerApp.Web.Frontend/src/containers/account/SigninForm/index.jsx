import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { SignUpLink } from '../../../components/common/links';
import { ErrorField } from '../../../components';

import { getLastErrors } from '../../../reducers/account';
import { signIn, clearErrors } from '../../../actions/actionCreators/account';

import './signin-modal.css';
import './signin-form.css';

const mapStateToProps = state => ({
    validationErrors: getLastErrors(state)
});

export class SignInForm extends Component {
    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        return (
            <section className="signin-modal has-text-centered">
                <div className="signin-form">
                    <h3 className="title has-text-grey signin-form__title">Sign in</h3>
                    <p className="subtitle has-text-grey signin-form__subtitle">
                        B e e r C a t a l o g
                    </p>
                    <div className="box signin-form__form">
                        {this.renderErrorField()}
                        <form className="signin-form__form" onSubmit={this.handleSignInClick}>
                            <div className="field">
                                <div className="control">
                                    {this.renderEmailInput()}
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    {this.renderPasswordInput()}
                                </div>
                            </div>
                            <div className="field">
                                {this.renderRememberMeCheckbox()}
                            </div>
                            <button className="button is-block signin-form__button is-large is-fullwidth">
                                Sign in
                            </button>
                        </form>
                    </div>
                    <p className="has-text-grey signin-form__links">
                        <SignUpLink>
                            Sign Up
                        </SignUpLink>&nbsp; · &nbsp;
                        <a href="../">Forgot Password</a>&nbsp; · &nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </section>
        );
    }

    renderErrorField = () => (
        <ErrorField errors={this.props.validationErrors}/>
    )

    renderEmailInput = () => (
        <input
            ref={ node => this.loginInput = node }
            className="input is-large"
            type="email"
            placeholder="Your Email"
            autoFocus
            required
        />
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

    renderRememberMeCheckbox = () => (
        <label className="checkbox">
            <input
                type="checkbox"
                ref={ node => this.rememberMeCheckbox = node }
            />
            Remember me
        </label>
    )

    handleSignInClick = (e) => {
        e.preventDefault();

        const userCredentials = {
            email: this.loginInput.value,
            password: this.passwordInput.value,
            rememberMe: this.rememberMeCheckbox.checked
        };
        this.props.signIn(userCredentials)
            .then(() => {
                if (!this.props.validationErrors) {
                    this.props.closeModal();
                }
            });
    }
}

export default withRouter(connect(mapStateToProps, { signIn, clearErrors })(SignInForm));
