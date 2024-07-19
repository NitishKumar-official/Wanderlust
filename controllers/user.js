const User = require("../models/user.js");

// signup form route
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
}

//signup route
module.exports.signup = async (req, res)=>{
    try{
    let{username, email, password} = req.body;
    const newUser = new User({username, email});
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    })

    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }    
}

//login form route
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

//login route
module.exports.login = async (req,res)=>{
    req.flash("error", "welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

//logout route
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
}