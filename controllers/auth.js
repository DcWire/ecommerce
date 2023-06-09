const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { expressjwt : jwt2} = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');


require('dotenv').config();

exports.signup = (req, res) => {
  // console.log('req.body', req.body);
  const user = new User(req.body);
  user.save()
  .then((user) => {
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
        user
    });
  })
  .catch((err) => {
    return res.status(400).json({
        err: errorHandler(err),
    })
  })
};

exports.signin = (req, res) => {
  // find the user based on email
  // console.log(req.body);

  const { email, password } = req.body;
  User.findOne({email})
  .then((user) => {
    if (!user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password didn't match",
      });
    }
    // generate a signed token with user id and secret
    // console.log(user);
    secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { _id: user._id },
      // { algorithms : ['HS256'] },
      secret
    );
    
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });


  })
  .catch((err) => {
    console.log(err);
    return res.status(400).json({
        error: 'Error accessing user',
    })
  })
  
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

// exports.requireSignin = jwt2({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   userProperty: 'auth',
//   getToken: function getCookie(req) {
//     // console.log(req.body);
//     if (req.cookies && req.cookies.t) {
//       return req.cookies.t;
//     }
//     return null;
//   },
// });

exports.requireSignin = (req, res, next) => {
  token = req.cookies.t;
  if(!token) {
    token = req.headers['authorization'];
    if(token) {
      token = token.split(' ')[1];
    }
  }

  
  if (!token) {
    throw new Error('Not authorised');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.auth = decoded;
  } catch(err) {
    console.log("here");
    return res.status(400).json({
      error: 'Invalid token',
    });
  }
  
  next();
}


exports.isAuth = (req, res, next) => {
  // console.log(req.auth);
  // console.log(req.profile);
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};

