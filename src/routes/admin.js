var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer= require('multer');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        const uploadPath = 'public/images';
        // Tạo thư mục nếu chưa tồn tại
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.png`);
      }
    
});

const upload = multer({ storage: storage });

const adminProduct =require('../controller/adminProductController');
const adminCategory= require('../controller/adminCategoryController');
//handle product
router.delete('/delete/product', adminProduct.deleProduct);
router.post('/update/product',upload.single('image'), adminProduct.updateProduct);
router.get('/api/categories', adminProduct.inforCategories);
router.get('/api/products', adminProduct.inforProducts);
router.get('/api/product/:_id', adminProduct.inforProduct);
router.post('/add/product',upload.single('image'), adminProduct.addProduct)
router.get('/add/product', adminProduct.pageAddProduct)
router.get('/products', adminProduct.products);

//handle category
router.get('/categories',adminCategory.pageCategories );
router.post('/add/category',adminCategory.addCategory);
router.post('/update/category', adminCategory.updateCategory);
router.delete('/delete/category', adminCategory.deleCategory)
router.get('/add/category',adminCategory.pageAddCategory);
router.get('/api/category/:_id',adminCategory.inforCategory);
module.exports= router;