import { Switch, Route } from 'react-router-dom';
import React, { Fragment, Component } from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import Modal from '../../components/common/Modal';
import { Landing, Favorites, Details } from '../pages';

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
                    <ModalRoute path='*/account/register' component={Modal} />
                    <ModalRoute path='*/account/signin' component={Modal} />
                    <ModalRoute path='*/account/settings' component={Modal} />
                </Switch>

                <ModalContainer />
            </Fragment>
        );
    }
}
