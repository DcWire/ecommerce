import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/signin">Sign In</Link>
                    </li>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/signout">Sign Out</Link>
                    </li>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;