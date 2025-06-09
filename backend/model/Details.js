const mongoose = require("mongoose");
const schema = mongoose.Schema;

const detailSchema = new schema({
    venue_id : String,
    venue_name : String,
    venue_image : String,
    user_id : String,
    user_name : String,
    user_email : String,
    curr_date : String,
    booking_date : String,
    vo_email : String,
    status : {
        type : String,
        default : "Pending"
    },

});

module.exports = mongoose.model("detail", detailSchema);