const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const foodCategorySchema = new Schema({
  CategoryName : {
    type : String,
    required : true,
  }
})
module.exports = mongoose.model('foodcategory' , foodCategorySchema);