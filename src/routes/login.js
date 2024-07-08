var express = require('express');
var router = express.Router();
const loginController= require("../controller/loginController");

router.get('/', loginController.getLogin);

router.post('/', loginController.handlelogin);
module.exports = router;