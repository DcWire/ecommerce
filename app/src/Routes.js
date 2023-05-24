import React from 'react';
import {BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import Home from './core/Home'
import AdCreate from './Ad/CreateAd'

import User from './core/User'
console.log(Home);

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/ad/:id" element={<Ad />} />
                {/* <Route exact path="/ad/create" element={<Ad />} />
                <Route exact path="/user/:id" element={<Ad />} />
                <Route exact path="/user/create" element={<Ad />} /> */}
                <Route path="*" element={<h1>Not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;