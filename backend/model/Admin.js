const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema({
    name : String,
    email : String,
    password : String,
    role : {
        type : Number,
        default : 3001
    },
    refreshToken : String
});

module.exports = mongoose.model("admin", adminSchema);