const verifyRoles = (...allowedRole) => {
    return (req, res, next) => {

        if(!req.body?.role) {
            console.log("No role added in the request");
            return res.sendStatus(401);
        }
        // else {
        //     console.log(allowedRole+"   "+req.body.role+"Role Added");
        // }

        if(!allowedRole.includes(req.body.role)) {
            return res.sendStatus(401);
        }

        next();
    }
}

module.exports = verifyRoles;