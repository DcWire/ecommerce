const express = require('express');
const bodyParser = require('body-parser');
const cookierParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const expressValidator = require('express-validator');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const adRouter = require('./routes/ad');

require('dotenv').config();
const app = express();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {});
        console.log('MongoDB is connected');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}


connectDB();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookierParser());
app.use(expressValidator());
app.use(cors());


app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', adRouter);

const PORT = process.env.PORT || 8000;
console.log(PORT)
// app.post('/api', (req, res) => {
//     console.log(req.body);
//     res.send('Hello World');
// });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});