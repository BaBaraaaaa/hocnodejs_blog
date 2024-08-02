const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Role = require('./Role');
const User = new Schema({
    email: { type: String, maxLength: 100, required: true },
    password: { type: String,required: true  },
    role_id: {type: Schema.Types.ObjectId, ref : 'Roles',required: true },
    
}, { timestamps: true });
User.plugin(mongoose_delete,
    { overrideMethods: 'all' },
);

//create method to compare password
User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);

};
module.exports = mongoose.model('User', User);