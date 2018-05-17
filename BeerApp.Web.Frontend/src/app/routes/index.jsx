import { Switch, Route } from 'react-router-dom';
import React, { Fragment, Component } from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import { Landing, Favorites, Details } from '../pages';
import { SignInForm, SettingsPanel } from '../../containers';

export default class Router extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path='/favorites/page=:pageNumber' component={Favorites} />
                    <Route path='/beer/:beerId' component={Details} />
                    <Route path='/' component={Landing} />
                </Switch>
                <Switch>
                    <ModalRoute path='*/account/signup' component={SignInForm} />
                    <ModalRoute path='*/account/signin' component={SignInForm} />
                    <ModalRoute path='*/account/settings' component={SettingsPanel} />
                </Switch>

                <ModalContainer
                    modalClassName="react-router-modal__modal is-full-width no-bg-color"
                />
            </Fragment>
        );
    }
}
