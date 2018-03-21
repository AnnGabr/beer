import { Landing, Favorites, BeerDetails } from '../pages';
import { Switch, Route } from 'react-router-dom';
import React from 'react';

export const Router = () => (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/favorites/page=:pageNumber' component={Favorites} />
        <Route path='/beer' component={BeerDetails} />
    </Switch>
);
