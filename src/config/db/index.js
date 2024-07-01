
const mongoose = require('mongoose');

async function connectDB() {
    try
    {
        await mongoose.connect('mongodb://localhost:27017/F8_education_dev');
        console.log("connected successfully");
    }
    catch(e)
    {
        console.log("connected failed");
        console.log(e);
    }

}

module.exports = {connectDB};