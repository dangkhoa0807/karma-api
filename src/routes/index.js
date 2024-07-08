const categoryRoute = require('./category');
const jwt= require("jsonwebtoken");
const productRoute = require('./product');
const login=require('./login');
const signup= require('./signup');
const admin= require('./admin');
const checkout = require('./checkout');
const User =require ('../model/User');
function route(app){
	
	app.use('/checkout',checkout);
	app.use('/store', categoryRoute);
	app.use('/admin', admin);
	app.get('/cart', (req, res) => {
		res.render('page/cart');
	});
	app.get('/auth/me', async (req,res)=>{
		const SECRET_KEY= require('../config/secret_key');
		try {
			const token = req.header("Authorization")?.replace("Bearer ", "");
			if (!token) {
				return res.status(401).json({ error: 'Token must be provided' });
			}
	
			const data = jwt.verify(token, SECRET_KEY);
			const user = await User.findOne({ _id: data._id });
			
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
	
			res.status(200).json({user});
		} catch (error) {
			if (error.name === 'JsonWebTokenError') {
				return res.status(401).json({ error: 'Invalid token' });
			}
			res.status(500).json({ error: 'An error occurred' });
		}
	});
	app.use('/login',login );
	app.use('/signup',signup );
	app.get('/', (req, res) => {
		res.render('home');
	});
	
	
	app.use('/product', productRoute);
	
}


module.exports= route;