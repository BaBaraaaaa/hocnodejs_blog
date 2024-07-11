
module.exports = {
    mutipleMongooseToObject: function (obj) {
    return  obj.map(obj=> obj.toObject());
    },
    mongooseToObject: function (obj) {
        return  obj ? obj.toObject() : obj;
        }
};