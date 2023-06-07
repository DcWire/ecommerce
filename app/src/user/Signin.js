import React, {useState, useEffect} from 'react'
import {redirect, Link, Navigate, useNavigate} from 'react-router-dom'
import Navbar from '../core/Navbar'
import {API} from '../config'
import {isAuthenticated, signin, authenticate} from '../auth/index'
function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
    });

    const [isItAuthenticated, setIsItAuthenticated] = useState(
        JSON.parse(localStorage.getItem("jwt")) || false
    );
    


    const {email, password, error} = values;
    const {user} = isAuthenticated();

    const navigate = useNavigate();

    

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value});
    }

   

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values});
        signin({email, password})
        .then(data => {
            if(data.error) {
                console.log(data.error);
                setValues({...values, error: data.error});
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                    });
                })
                navigate('/');
            }
        })
    }

    useEffect(() => {
        const check = isAuthenticated() ? true : false;
        setIsItAuthenticated(check);
        
    }, []);

    
    if(isItAuthenticated) {
        return <Navigate replace to="/" />;
    }
    else {
        return (
            <div>
                <Navbar />
                <div className="container mt-5" style={{paddingRight: "200px", paddingLeft: "200px"}}>
                    <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleChange('email')}></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={password} onChange={handleChange('password')}></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={clickSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

      
    
}


export default Signin;