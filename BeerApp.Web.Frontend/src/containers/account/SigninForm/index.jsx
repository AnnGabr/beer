import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './signin-modal.css';
import './signin-form.css';

export class SigninForm extends Component {
    render() {
        return (
            <section className="signin-modal has-text-centered">
                <div className="signin-form">
                    <h3 className="title has-text-grey signin-form__title">Sign in</h3>
                    <p className="subtitle has-text-grey signin-form__subtitle">Please enter to proceed.</p>
                    <div className="box signin-form__form">
                        <form className="signin-form__form">
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" type="email" placeholder="Your Email" autofocus=""/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" type="password" placeholder="Your Password"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="checkbox">
                                    <input type="checkbox"/>
                                    Remember me
                                </label>
                            </div>
                            <button className="button is-block signin-form__button is-large is-fullwidth">Sign in</button>
                        </form>
                    </div>
                    <p className="has-text-grey signin-form__links">
                        <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </section>
        );
    }
}

export default withRouter(connect()(SigninForm));
