import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getOneAd} from '../core/Ad'
const ShowAd = () => {
    const {adId} = useParams();
    // const [ad, setAd] = useState({});
    getOneAd(adId)
    .then((data) => {
        if(data.error) {
            console.log(data.error);
        }
        else {
            console.log(data);
        }
    })
    .catch((err) => {
        console.log(err);
    })

    
    return (
        <div>
            <div>
                {/* {ad.title} */}
                Hey
            </div>
        </div>
    )
}

export default ShowAd;