const User = require('../model/User');
const Admin = require('../model/Admin');
const Owner = require('../model/VenueOwner');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) {
        console.log("Unauthorized\n"+cookies);
        return res.sendStatus(401);
    }

    const currRefreshToken = cookies.jwt;
    console.log("Curr RT : "+currRefreshToken)
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000, secure : true });

    const foundUser = await User.findOne({refreshToken : currRefreshToken});
    const foundAdmin = await Admin.findOne({refreshToken : currRefreshToken});
    const foundOwner = await Owner.findOne({refreshToken : currRefreshToken});

    if(!foundAdmin && !foundUser && !foundOwner) {
        return res.sendStatus(403);
    } 

    const user = !foundAdmin 
                    ? !foundUser 
                        ? foundOwner 
                        : foundUser
                    : foundAdmin;

    jwt.verify(
        currRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded)=> {

            const role = user.role;
            const email = user.email;

            if(err) {
                console.log("Refresh token has expired");
                user.refreshToken = "";
                const result = await user.save();
                console.log(result);
            }
            if(err || email !== decoded.email) {
                return res.sendStatus(403);
            }

            
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1m'}
            );

            const newRefreshToken = jwt.sign(
                {"email" : email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '3m'}
            );
            console.log("New RT : "+ newRefreshToken)
            user.refreshToken = newRefreshToken;
            const result = await user.save();
 
            console.log("New AT : "+accessToken);
            // console.log(result);

            res.cookie('jwt', newRefreshToken, {httpOnly : true, sameSite: "None", maxAge : 24*60*60*1000, secure : true});

            res.json({email, role, accessToken});
        }
    );
}
 
module.exports = {handleRefreshToken};