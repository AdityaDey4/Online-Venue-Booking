require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors');

const credentials  = require('./myMiddleware/credentials');
const corsOption = require('./config/corsOption');
const verifyJWT = require("./myMiddleware/verifyJWT");

const connectDB = require("./config/dbConnect")

const flu=require("express-fileupload");
app.use(flu());
app.use(express.static('public'))

const PORT = process.env.PORT || 3500; 

connectDB(); 
app.use(credentials);
app.use(cors(corsOption));


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use('/venue', require('./route/api/venue'));
app.use('/feature', require('./route/api/feature'));
app.use('/venueOwnerRegister', require('./route/ownerRegister'));
app.use('/userRegister', require('./route/userRegister'));
app.use('/auth', require('./route/auth'));
app.use('/logout', require('./route/logout'));
app.use('/refresh', require('./route/refresh')); 
app.use('/feedback', require('./route/api/feedback'));
 
app.use(verifyJWT);
 
app.use('/venueOwner', require('./route/api/venueOwner'));
app.use('/admin', require('./route/admin'));
app.use('/user', require('./route/api/user'));
app.use('/detail', require('./route/api/detail'));
app.use('/userDetails', require('./route/userDetails'));
app.use('/venueDetails', require('./route/venueDetails'));
app.use('/venueOwnerDetails', require('./route/venueOwnerDetails'));
app.use('/venueOwnerVenues', require('./route/venueOwnerVenues'));
 
mongoose.connection.once("open", ()=> {

    console.log("Connected with MongoDB");
    app.listen(PORT, ()=> {
        console.log("Server running on port "+PORT);
    });
});


// admin pwd : Admin@123