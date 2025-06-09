const User = require('../model/User');
const Admin = require('../model/Admin');
const Owner = require('../model/VenueOwner');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const currRefreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken : currRefreshToken});
    const foundAdmin = await Admin.findOne({refreshToken : currRefreshToken});
    const foundOwner = await Owner.findOne({refreshToken : currRefreshToken});

    if(foundAdmin) {
        foundAdmin.refreshToken = "";
        await foundAdmin.save();
    }
    else if(foundUser) {
        foundUser.refreshToken = "";
        await foundUser.save();
    }
    else if(foundOwner) {
        foundOwner.refreshToken = "";
        await foundOwner.save();
    }

    res.clearCookie(
        'jwt',
        {secure : true, httpOnly : true, sameSite : 'None', maxAge : 24*60*60*1000}
    );

    return res.sendStatus(204);
}

module.exports = {handleLogout};