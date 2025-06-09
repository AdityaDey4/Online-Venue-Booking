const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async(req, res)=> {
    
    const {name, password, email, address, mobile} = req.body;

    const duplicate = await User.findOne({email : email}).exec();

    if(duplicate) {
        return res.status(409).json({'message' : `User with ${email} already exist`});
    }

    try {

        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await User.create({
            "name" : name,
            "email" : email,
            "password" : hashedPwd,
            "mobile" : mobile,
            "address" : address
        });

        res.status(201).json({"message" : `New User ${name} has been created`});

    }catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {handleNewUser};