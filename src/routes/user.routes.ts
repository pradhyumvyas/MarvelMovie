const userExpress = require('express').Router(); 
const {middleware, verifyUser} = require("../middlewares/auth.middleware.ts");
const {registerUser, loginUser, logoutUser} = require("../controller/user.controller.ts");
const router = userExpress;

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(verifyUser,logoutUser)

module.exports = router;