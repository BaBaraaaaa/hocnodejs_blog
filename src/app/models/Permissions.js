const mongoose = require("mongoose");;
const permissions = new Schema({
    name : String,
    title : String
});
module.exports = mongoose.model('Permissions', permissions);