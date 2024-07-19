const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });

router
.route("/")
  .get(wrapAsync(listingController.index))   // index route
  .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));   //create route



//New form route
router.get("/new",isLoggedIn, listingController.renderNewForm);  

router
 .route("/:id")  
  .get(wrapAsync(listingController.showListing))   //Show route
  .put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))  // update route
  .delete( isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));     //Delete Route

//edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports= router;