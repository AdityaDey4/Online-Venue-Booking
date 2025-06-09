const mongoose = require("mongoose");
const schema = mongoose.Schema;

const venueOwnerSchema = new schema({
    name : String,
    email : String,
    password : String,
    mobile : Number,
    address : String,
    role : {
        type : Number,
        default : 4001
    },
    refreshToken : String
});

module.exports = mongoose.model("venueOwner", venueOwnerSchema);