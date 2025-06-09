const mongoose = require("mongoose");
const schema = mongoose.Schema;

const venueSchema = new schema({
    name : String,
    address : String,
    price : Number,
    description : String,
    max_people : Number,
    image:String,
    vo_email : String
});

module.exports = mongoose.model("venue", venueSchema);