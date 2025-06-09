const User = require("../../model/User");

const getAllUsers = async (req, res) => {

    const users = await User.find();
    res.json(users);
}

const deleteUser = async (req, res)=> {

    if(!req?.body?.email) return res.status(400).json({"message" : "Email is required to delete a user"});

    const user = await  User.findOne({email : req.body.email}).exec();

    if(!user) {
        return res.status(204).json({ 'message': 'User not found' });
    }

    const result = await User.deleteOne({email : req.body.email}).exec();
    res.json({"message" : "Successfully Deleted"});
}

const getUser = async(req, res)=> {

    if (!req?.params?.email) return res.status(400).json({ "message": 'Email is required' });
 
    const user = await User.findOne({email: req.params.email }).exec();
    if (!user) {
        return res.status(204).json({ "message": 'User not found' });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}