import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getOneAd} from '../core/Ad'
import Navbar from '../core/Navbar'

const ShowAd = () => {
    const {adId} = useParams();
    const [ad, setAd] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        postedBy: '',
    });

    const {title, description, price, category, postedBy} = ad;
    const findAd = () => {
        
        getOneAd(adId)
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                setAd(data.ad);
                // console.log(data.ad);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        findAd();
    }, []);


    return (
        <div>
            <Navbar />
            <div>
               <h2>{title}</h2>
                <h2>{description}</h2>
                <h2>{category}</h2>
                <h2>{price}</h2>
                <h2>{postedBy}</h2>
            </div>
        </div>
    )
}

export default ShowAd;