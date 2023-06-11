import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {getOneAd, deleteOneAd} from '../core/Ad'
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
    const data = JSON.parse(localStorage.getItem('jwt'));

    const navigate = useNavigate();
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
    const deleteAd = (event) => {

        event.preventDefault();
        deleteOneAd(adId, data.user._id, data.token)
        .then((data) => {
            if(data.error) {
                console.log(data.error);
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        });
        
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
            <button type="button" className="btn btn-danger" onClick={deleteAd}>Delete Ad</button>
        </div>
    )
}

export default ShowAd;