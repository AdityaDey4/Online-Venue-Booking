const Detail = require('../../model/Details');
const User = require('../../model/User');
const Venue = require('../../model/Venue')

const getAllDetail = async (req, res) => {

    const detail = await Detail.find();
    res.json(detail);
}

const getDetail = async (req, res) => { 

    const id = req?.params?.id;
    if(!id) return res.status(400).json({"message" : "id is needed."});

    const detail = await Detail.findById(id);
    if(!detail) return res.status(204).json({"message" : `No booking details found of id : ${id}`});

    res.json(detail); 
}

const postDetail = async (req, res)=> {
    const {venue_id, user_id, curr_date, booking_date} = req.body;

    try {
        
        const user = await User.findById(user_id);
        const venue = await Venue.findById(venue_id);

        const result = await Detail.create({
            "venue_id" : venue_id,
            "venue_image" : venue.image,
            "venue_name" : venue.name,
            "user_id" : user_id,
            "user_name" : user.name,
            "user_email" : user.email,
            "curr_date" : curr_date,
            "booking_date" : booking_date,
            "vo_email" : venue.vo_email
        });

        res.status(201).json({"message" : `Booking Details has been created successfully`})
    }catch(err) {
        res.status(500).json(err.message);
    }
}

const getUserBookingDetails = async (req, res)=> {
    
    const id = req.params.id;

    const details = await Detail.find({"user_id" : id});
    res.json(details);
}

const getVenueBookingDetails = async (req, res)=> {
    
    const {id} = req.params;

    const details = await Detail.find({"venue_id" : id});
    res.json(details);
}

const getVenueOwnerBookingDetails = async (req, res)=> {
    
    const {email} = req.params;

    const details = await Detail.find({"vo_email" : email});
    res.json(details);
}

module.exports = {
    getAllDetail,
    getDetail,
    postDetail,
    getUserBookingDetails,
    getVenueBookingDetails,
    getVenueOwnerBookingDetails
}