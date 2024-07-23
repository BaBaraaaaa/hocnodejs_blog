const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Course = new Schema({
    name: {type: String,maxLength: 100,required: true},
    description: {type:String , maxLength:250} ,
    image: {type: String},
    videoId: {type: String},
    // mongoose plugin slug-generator 
    // cho phép người dùng tạo ra slug tự động từ tên khóa chính
    slug: {type: String, slug: 'name', unique: true},
}, { timestamps: true });

Course.plugin(mongoose_delete,
    {
        overrideMethods: true,
    }
);

module.exports = mongoose.model('Course', Course);