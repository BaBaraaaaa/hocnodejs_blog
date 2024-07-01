const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Course = new Schema({
    name: {type: String,maxLength: 100},
    description: {type:String , maxLength:250} ,
    image: String,
    created_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
})


module.exports = mongoose.model('Course', Course);