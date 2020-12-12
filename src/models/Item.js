const { Schema, model } = require("mongoose");
const ItemSchema = new Schema({
  _id: String,
  title: String,
});
module.exports = new model('Item',ItemSchema)