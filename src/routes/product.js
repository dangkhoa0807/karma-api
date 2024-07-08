var express = require('express');
var router = express.Router();

const productController =require('../controller/ProductController');

router.get('/',productController.infor);
router.post('/',productController.index);
module.exports = router;
