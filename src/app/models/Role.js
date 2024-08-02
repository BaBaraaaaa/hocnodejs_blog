const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = new Schema({
  name: {type:String,required: true,default:'User' },
  title : { type: String, required: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});
module.exports = mongoose.model('Roles', Role);
