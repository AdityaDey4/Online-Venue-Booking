const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next)=> {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {

            if(err) return res.sendStatus(403); // invalid token

            req.body.email = decoded.UserInfo.email;
            req.body.role = decoded.UserInfo.role;

            // console.log("decoded.UserInfo.email : "+req.body.email);
            // console.log("decoded.UserInfo.role : "+req.body.role);
            next();
        }
    );  
}

module.exports = verifyJWT;