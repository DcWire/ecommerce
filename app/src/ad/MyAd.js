import React, {useState, useEffect} from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../core/Navbar';
import { getMyAd, getOneAd } from '../core/Ad';
const MyAd = () => {

    // const [searchParams, setSearchParams] = useSearchParams();
    const [ads, setAds] = useState([]);
    const [adRefs, setAdRefs] = useState([]);
    
    


    const getAdRefs = () => {
        const data = JSON.parse(localStorage.getItem('jwt'));
        const id = data.user._id;
        const token = data.token;

        getMyAd(id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                setAdRefs(data);
                return data;
            }
        })
        .then(data => {
            data.map((ad) => {
                getOneAd(ad)
                .then(data => {
                    if(data.error) {
                        console.log(data.error);
                    }
                    else {
                        setAds(ads => [...ads, data]);
                    }
                })
            })

        })
        .catch(err => {
            console.log(err);
        })
    }



    useEffect(() => {
        getAdRefs();
    }, []);

    
    const styles = {
        margin: '20px',
        marginBottom: '50px',
        // border: '1px solid black',
        // borderRadius: '10px',
    }
    // console.log(ads);
    return ads.length > 0 ? (

        <div>
            <Navbar />
            <div className="container">
                <div className="row">
            {
            
            ads.map((ad) => (
                
                        <div key={ad.ad._id} className="col-md-3" style={styles}>
                        <div className="container" >
                            <Link to={`/ad/${ad.ad._id}`} style={{textDecoration: 'none'}}>
                                <img className="card-img-top" src="https://picsum.photos/200" />
                                <div className="container" style={{border:"1px solid black", borderBottomRightRadius:"5%", borderBottomLeftRadius:"5%"}}>
                                    <div className="card-body" style={{marginLeft: "-5px"}}>
                                        <h5 className="card-title">{ad.ad.title}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush" style={{marginLeft: "-5px"}}>
                                        <li className="list-group-item">Category: {ad.ad.category}</li>
                                        <li className="list-group-item">Price: {ad.ad.price}</li>
                                        <li className="list-group-item">Location: {ad.ad.location}</li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                        </div>
                    ))
            }
            </div>
            </div>
        </div>
    ) : (
        <div>
            {/* {console.log(ads.length)} */}
            <Navbar />
            <div>Loading...</div>
        </div>
        
    )
}

export default MyAd;