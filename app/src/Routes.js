import React from 'react';
import {BrowserRouter, Route, Routes as Switch} from 'react-router-dom';
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Profile from './user/Profile'
import ShowAd from './ad/ShowAd'
// import AdCreate from './Ad/CreateAd'

// import User from './core/User'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/ad/:adId" element={<ShowAd />} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;