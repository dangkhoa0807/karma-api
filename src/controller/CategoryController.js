
const Category= require('../model/Category');
const Product = require('../model/Product');
class CategoryController{

	index(req,res){
		Category.find({})
		.then(categories => {
			categories= categories.map(category => category.toObject());
			res.render('page/category',{categories});
		})
		.catch(err => {
			console.log(err);
		})	
	}
	infor(req, res) {
		const cateName = req.params.category; // Lấy tên category từ request params
		Category.findOne({ name: cateName }) // Tìm Category theo tên
		  .then(category => {
			if (!category) {
			  throw new Error('Category not found');
			}
			return Product.find({ category: category._id }) // Tìm Product với category là _id của Category tìm được
			  .then(products => {
				res.json( products );
			  });
		  })
		  .catch(err => {
			console.log(err);
			res.status(404).send('Category not found');
		  });
	  }


	 cate(req,res){
		const cate = req.params.category;
		Category.find({})
		.then(categories => {
			categories= categories.map(category => category.toObject());
			res.render('page/category',{categories});
		})
		.catch(err => {
			console.log(err);
		})
	}
}	

module.exports = new CategoryController;