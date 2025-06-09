const mongoose = require("mongoose");
const schema = mongoose.Schema;

const featureSchema = new schema({
    bestFor : Object,
    facilities : Object,
    venue_id : String,
    vo_email : String
});

module.exports = mongoose.model("feature", featureSchema);