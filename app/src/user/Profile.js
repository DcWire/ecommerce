import {useState, useEffect} from 'react'
import Navbar from '../core/Navbar'
import {API} from '../config'
import {useNavigate} from 'react-router-dom'
import {isAuthenticated, signin, authenticate} from '../auth/index'
import {getUser} from '../auth/getUser'

const Profile = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        about: "" 
    });

    const {name, email, about} = values;

    const findUser = () => {
        const data = JSON.parse(localStorage.getItem('jwt'));
        const _id = data.user._id;
        const token = data.token;
        getUser(_id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                // console.log(data);
                setValues({
                    name: data.name,
                    email: data.email,
                    about: data.about
                })
            }
        })
        .catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        findUser();
    }, []);
    return (
        <div>
            <Navbar />
            <div>
                <h1>Profile</h1>
                <h2>{name}</h2>
                <h2>{email}</h2>
                <h2>{about}</h2>
            </div>
        </div>
    )
}

export default Profile;