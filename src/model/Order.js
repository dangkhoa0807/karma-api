const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
	firstName: {type : String, required: true},
	lastName: {type : String, required: true},
	phoneNumber: {type : String, required: true},
	address: {type : String, required: true},
	city: {type : String, required: true},
	district: {type : String, required: true},
	message: {type : String},
	methodPayment:{type : String},
	products:{type: Array},
	createAt:{ type: Date , default : Date.now()},
	updateAt:{ type: Date , default : Date.now()}
	
});
module.exports = mongoose.model("Order", Order);