const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const User = require("../models/user.js");


const userController = require("../controllers/user.js");

router
 .route("/signup")
   .get(userController.renderSignupForm )      // signup form route
   .post( wrapAsync(userController.signup));    //signup route




router.route("/login")   
.get(userController.renderLoginForm )   //login form route
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}), userController.login)  //login route


//logout route
router.get("/logout", userController.logout );


module.exports= router;