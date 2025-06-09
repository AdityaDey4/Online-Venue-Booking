const User = require('../model/User');
const Admin = require('../model/Admin');
const Owner = require('../model/VenueOwner');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res)=> {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({"message" : "email & Password are required & device should be connected with internet"});
    }

    const foundUser = await User.findOne({email : email});

    const foundAdmin = await Admin.findOne({email : email});

    const foundOwner = await Owner.findOne({email : email});

    if(!foundUser && !foundAdmin && !foundOwner) {
        return res.sendStatus(401);
    }

    if(foundAdmin) {

        const adminMatch = await bcrypt.compare(password, foundAdmin.password);

        if(adminMatch) {

            const role = foundAdmin.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : foundAdmin.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1m'}
            );

            const refreshToken = jwt.sign(
                {'email' : foundAdmin.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '3m'}
            );

            foundAdmin.refreshToken = refreshToken;
            const result = await foundAdmin.save();
            console.log(result);

            res.cookie(
                'jwt',
                refreshToken,
                {secure : true, httpOnly : true, sameSite : "None", maxAge : 24*60*60*1000}
            );

            return res.json({email, role, accessToken});
        }
    } 
    
    else if(foundUser) {

        const userMatch = await bcrypt.compare(password, foundUser.password);

        if(userMatch) {
            const role = foundUser.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : foundUser.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1m'}
            );

            const refreshToken = jwt.sign(
                {'email' : foundUser.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '3m'}
            );

            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(accessToken)
            console.log(result);

            res.cookie(
                'jwt',
                refreshToken,
                {secure : true, httpOnly : true, sameSite : "None", maxAge : 24*60*60*1000}
            );

            return res.json({email, role, accessToken});
        }
    } 

    else if(foundOwner) {

        const ownerMatch = await bcrypt.compare(password, foundOwner.password);

        if(ownerMatch) {
            const role = foundOwner.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : foundOwner.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1m'}
            );

            const refreshToken = jwt.sign(
                {'email' : foundOwner.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '3m'}
            );

            foundOwner.refreshToken = refreshToken;
            const result = await foundOwner.save();
            console.log(accessToken)
            console.log(result);

            res.cookie(
                'jwt',
                refreshToken,
                {secure : true, httpOnly : true, sameSite : "None", maxAge : 24*60*60*1000}
            );

            return res.json({email, role, accessToken});
        }
    } 

    res.sendStatus(401);
}

module.exports = {handleLogin};