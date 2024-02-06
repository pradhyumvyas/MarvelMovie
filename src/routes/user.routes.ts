const userExpress = require('express').Router(); 
const {middleware} = require("../middlewares/auth.middleware.ts");
const {registerUser} = require("../controller/user.controller.ts");
const router = userExpress;

router.route('/register').post(registerUser);


module.exports = router;