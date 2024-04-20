const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const foodDataSchema = new Schema({

  CategoryName : {
    type : String, 
    required : true,
  },
  name : {
    type : String, 
    required : true,
  },
  img : {
    type : String, 
    required : true,
  },
  options : [
    {
      // half : String,
      // full : String,
      regular : String,
      medium : String,
      large : String,
    }
  ],
  description : {
    type : String,
    required : true,
  }
})
module.exports = mongoose.model('foodData' , foodDataSchema);