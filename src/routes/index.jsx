import { Switch, Route } from 'react-router-dom';
import React from 'react';

import { Landing, Favorites, Details } from '../pages';

export const Router = () => (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/favorites/page=:pageNumber' component={Favorites} />
        <Route path='/beer/:id' component={Details} />
    </Switch>
);
