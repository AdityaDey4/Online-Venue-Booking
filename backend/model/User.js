const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name : String,
    password : String,
    email : String,
    mobile : Number,
    address : String,
    role : {
        type : Number,
        default : 2001
    },
    refreshToken : String
});

module.exports = mongoose.model("user", userSchema);