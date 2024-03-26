import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authUserRoute from './routes/user/authUserRoute.js';
import authSellerRoute from './routes/seller/authSellerRoute.js';

// load env variables
dotenv.config();


// connect to database
connectDB();

//rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));


// routes for user
app.use('/api/v1/userauth', authUserRoute);


// routes for seller
app.use('/api/v1/sellerauth', authSellerRoute);

// rest api
app.get('/', (req, res) => {
    res.send("<h1> Wellcome to My Ecommerce Website</h1>");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
});