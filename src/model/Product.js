const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 const ObjectId = Schema.ObjectId;

const Product= new Schema({
	name: { type: String, maxLength:255 },
	image:{ type: String, maxLength:255 },
	price: { type: Number },
	price_sales: { type: Number  },
	category: { type: ObjectId, },
	createAt:{ type:Date , default: Date.now},
	updateAt:{ type:Date , default: Date.now}
	
  });

module.exports= mongoose.model("Product", Product);