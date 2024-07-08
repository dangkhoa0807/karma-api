const Products= require('../model/Product');
const mongoose = require('mongoose');

class ProductController {
	infor(req, res, next) {
		const id = req.query.id;
		if(id){
			res.render('page/productDetail');
		}
	}
	index(req, res, next) {
		const id = req.query.id;
			Products.findOne({ _id: id })
			.then(product => 
				{
					res.json(product)
				
			})
			.catch(err=>{
				console.error('Lỗi khi truy vấn sản phẩm:', err);
          		res.status(500).send('Lỗi khi truy vấn sản phẩm');
			})
		}
	

}
 module.exports = new ProductController