import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getAds} from './Ad'
import Navbar from './Navbar'
import './Home.css'

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

    const styles = {
        margin: '20px',
        marginBottom: '50px',
        // border: '1px solid black',
        // borderRadius: '10px',
    }
    return (
         
        <div>
            <Navbar />
            <div className="jumbotron">
                <h1 className="display-4">
                    ECOM
                </h1>

                <hr className="my-4" />

                <p className="lead">
                    This is a simple ecommerce website where you can create, update, delete and view ads.
                </p>

            </div>
            <div className="container ml-2">
                <h1>
                    New arrivals
                </h1>
            </div>
            <div>
                {

                    <div className="container">
                    <div className="row">
                    {ads.map((ad) => (
                        <div key={ad._id} className="col-md-3" style={styles}>
                        <div className="container" >
                            <Link to={`/ad/${ad._id}`} style={{textDecoration: 'none'}}>
                                <img className="card-img-top" src="https://picsum.photos/200" />
                                <div className="container" style={{border:"1px solid black", borderBottomRightRadius:"5%", borderBottomLeftRadius:"5%"}}>
                                    <div className="card-body" style={{marginLeft: "-5px"}}>
                                        <h5 className="card-title">{ad.title}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush" style={{marginLeft: "-5px"}}>
                                        <li className="list-group-item">Category: {ad.category}</li>
                                        <li className="list-group-item">Price: {ad.price}</li>
                                        <li className="list-group-item">Location: {ad.location}</li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                        </div>
                    ))}
                    </div>
                    </div>
                }

            </div>
        </div>

    )
}
export default Home;