var express = require('express');
var router = express.Router();
const checkoutController= require("../controller/CheckoutController");

router.get('/', checkoutController.infor);
router.post('/', checkoutController.handlesCheckout);
module.exports = router;