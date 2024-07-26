const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Course = new Schema({
    name: { type: String, maxLength: 100, required: true },
    description: { type: String, maxLength: 250 },
    image: { type: String },
    videoId: { type: String },
    // mongoose plugin slug-generator 
    // cho phép người dùng tạo ra slug tự động từ tên khóa chính
    slug: { type: String, slug: 'name', unique: true },
}, { timestamps: true });
//Custom query helper
//https://mongoosejs.com/docs/guide.html#query-helpers
Course.query.sortable = (function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        //check if sort query is valid
        const isvalidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({ [req.query.column]: isvalidType ? req.query.type : 'desc' });
        // res.json({success: false, message: 'Invalid sort query'});
    }
    return this;
})
Course.plugin(mongoose_delete,
    { overrideMethods: 'all' },
);

module.exports = mongoose.model('Course', Course);