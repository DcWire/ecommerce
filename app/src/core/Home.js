import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getAds} from './Ad'


function Home() {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(false);


    const loadAds = () => {

    getAds().then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setAds(data);
        }
    });

    };

    useEffect(() => {
        loadAds();
    }, []);

    return (
        <div>
            <div>
                Ads 
            </div>
            <div>
                {
                    ads.map((ad, i) => 
                        { 
                            return <Link to={`/ad/${ad._id}`}>
                            <div key={ad._id} style={{margin: '20px', border: '2px solid black', width: '25%', textAlign: 'center'}} > 
                                <div>{ad.title}</div>
                                <div>{ad.description}</div>
                                <div>{ad.price}</div>
                                <div>{ad.category}</div>
                                <div>{ad.postedBy}</div>
                            </div> 
                            </Link>
                        }
                    )
                }

            </div>
        </div>

    )
}
export default Home;