var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');

router.post('/:category', categoryController.infor);
router.get('/:category', categoryController.cate);
router.get('/',categoryController.index);

module.exports = router;
