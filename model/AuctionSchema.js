const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({

  name: String,
  price: Number,
  email: String,
  condition: String,
  category: String,
  description: String,
  images: [String],
  time: { type: String },
  status: { type: String },
  buyer: String

},
  {

    collection: "products"

  });


module.exports = mongoose.model('products', ItemSchema);