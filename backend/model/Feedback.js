const mongoose = require("mongoose");
const schema = mongoose.Schema;

const feedbackSchema = new schema({
    name : String, 
    email : String,
    feedback : String,
    date : String,
    time : String
});

module.exports = mongoose.model("feedbacks", feedbackSchema);  