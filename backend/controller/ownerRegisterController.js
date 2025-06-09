const VenueOwner = require("../model/VenueOwner");
const bcrypt = require("bcrypt");

const handleNewVenueOwner = async(req, res)=> {
    
    const {name, password, email, mobile, address} = req.body;

    const duplicate = await VenueOwner.findOne({email : email}).exec();

    if(duplicate) {
        return res.status(409).json({'message' : `VenueOwner with ${email} already exist`});
    }

    try {

        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await VenueOwner.create({
            "name" : name,
            "email" : email,
            "password" : hashedPwd,
            "mobile" : mobile,
            "address" : address
        });

        res.status(201).json({"message" : `New VenueOwner ${name} has been created`});

    }catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {handleNewVenueOwner};