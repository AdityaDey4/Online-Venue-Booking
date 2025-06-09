const Feature = require("../../model/Feature");
const Venue = require('../../model/Venue');

const getFeature = async (req, res)=> {

    const id = req?.params?.id;
    if(!id) {
        return res.status(400).json({"message" : "Id is required to get the feature of the venue"});
    }
    const feature = await Feature.findOne({ venue_id : id}).exec();
    if(!feature) {
        return res.status(204).json({"message" : "Invalid Id"})
    }

    res.json(feature);
}

const postFeature = async (req, res) => {
    const {venue_id, bestFor, facilities, vo_email} = req.body;
    
    if(!venue_id || !bestFor || !facilities) {
        return res.status(400).json({ message: "please send all the details" });
    }
    const venue = await Venue.findById(venue_id);

    if(!venue) {
        return res.status(204).json({"message" : `venue with ${venue_id} is not exist`});
    }

    const feature = await Feature.findOne({venue_id : venue_id});
    let vo_email1;
    if(feature) {
        vo_email1 = feature.vo_email;
        await Feature.deleteOne({venue_id : venue_id}).exec()
    }

    const result = await Feature.create({
        'venue_id' : venue_id,
        'bestFor' : bestFor,
        'facilities' : facilities,
        'vo_email' : !vo_email ? vo_email1 : vo_email
    });

    res.status(201).json({"message" : "Feature created/updated."})
}

module.exports = { 
    getFeature,
    postFeature
}