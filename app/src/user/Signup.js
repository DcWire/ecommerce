import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../core/Navbar'
import {API} from '../config'


function Signup() {
    return (
        <div>
            <Navbar />

            <div className="container mt-5" style={{paddingRight: "200px", paddingLeft: "200px"}}>
                <form method="post" action={`${API}/signup`}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="about">Write about yourself</label>
                    <input type="text" className="form-control" id="about" placeholder="Not required" name="about"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password"></input>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;