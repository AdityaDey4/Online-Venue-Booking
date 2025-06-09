const Admin = require('../model/Admin');
const bcrypt = require("bcrypt");

const getAdmin = async (req, res)=> {

    const email = req?.params?.email;

    const admin = await Admin.findOne({email : email}).exec();

    if(!admin) {
        return res.status(204).json({ 'message': 'Admin not found' });
    }
    res.json(admin);
}
const handleNewAdmin = async (req, res)=> {
    const {name, password, email} = req.body;

    const duplicate = await Admin.findOne({email : email}).exec();

    if(duplicate) {
        return res.status(409).json({'message' : `Admin with ${email} already exist`});
    }

    try {

        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await Admin.create({
            "name" : name,
            "email" : email,
            "password" : hashedPwd
        });

        res.status(201).json({"message" : `New Admin ${name} has been created`});

    }catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {handleNewAdmin, getAdmin}