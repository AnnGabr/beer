import { Landing, Favorites, BeerDetails } from '../pages';
import { Switch, Route } from 'react-router-dom';
import React, {Component} from 'react';

export const Router = () => (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/beer' component={BeerDetails} />
    </Switch>
);
