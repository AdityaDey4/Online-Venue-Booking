const VenueOwner = require("../../model/VenueOwner");

const getAllVenueOwners = async (req, res) => {

    const venueOwners = await VenueOwner.find();
    res.json(venueOwners);
}

const deleteVenueOwner = async (req, res)=> {

    if(!req?.body?.email) return res.status(400).json({"message" : "Email is required to delete a Venue Owner"});

    const venueOwner = await  VenueOwner.findOne({email : req.body.email}).exec();

    if(!venueOwner) {
        return res.status(204).json({ 'message': 'Venue Owner not found' });
    }

    const result = await VenueOwner.deleteOne({email : req.body.email}).exec();
    res.json({"message" : "Successfully Deleted"});
}

const getVenueOwner = async(req, res)=> {

    if (!req?.params?.email) return res.status(400).json({ "message": 'Email is required' });
 
    const venueOwner = await VenueOwner.findOne({email: req.params.email }).exec();
    if (!venueOwner) {
        return res.status(204).json({ "message": 'Venue Owner not found' });
    }
    res.json(venueOwner);
}

module.exports = {
    getAllVenueOwners,
    getVenueOwner,
    deleteVenueOwner
}