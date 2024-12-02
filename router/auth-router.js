const express = require("express");
const router = express.Router();
const {register,login} = require("../controllers/auth-controlers");
const singnupSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware")
//const authMiddleware = require("../middlewares/auth-middleware")








//register
router.route('/register').post(validate(singnupSchema),register)
//login
router.route('/login').post(login)

//jwt verification
//router.route("/user").get(authMiddleware,user);




module.exports = router;