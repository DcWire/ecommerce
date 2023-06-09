import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../core/Navbar';
import { getMyAd } from '../core/Ad';
const MyAd = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const data = JSON.parse(localStorage.getItem('jwt'));
    const id = data.user._id;
    const token = data.token;
    const findAds = () => {
        getMyAd(id, token)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        findAds();
    }, []);


    return (

        <div>
            <Navbar />
            <h1>MyAd</h1>
        </div>
    );
}

export default MyAd;