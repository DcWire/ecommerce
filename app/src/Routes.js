import React from 'react';
import {BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import Home from './core/Home'
import Signin from './user/Signin'
// import AdCreate from './Ad/CreateAd'

// import User from './core/User'
console.log(Home);

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<Signin />} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;