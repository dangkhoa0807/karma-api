const Order= require('../model/Order');

class checkoutController{
	infor(req, res, next) {
		
			res.render('page/checkout');
	}
	handlesCheckout(req, res, next) {
		const formdata = req.body
		const order = new Order(formdata);
		order
		.save()
		.then((savedOrder) => {
			res.status(200).json({ message: "thanh toán thành công", order: savedOrder });
		})
		.catch((err) => {
			console.error("Lỗi đặt hàng :", err);
			res.status(500).json({ error: "Lỗi đặt hàng" });
		});
	}
	

}
 module.exports = new checkoutController