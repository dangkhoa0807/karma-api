var express = require('express');
var router = express.Router();
const loginController= require("../controller/loginController");

router.post('/check-existence', loginController.checkExistence);
router.get('/', loginController.getSignup);
router.post('/', loginController.handleSignup);
module.exports = router;