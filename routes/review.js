const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/review.js")

//post REVIEW route
//post method
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//post delete route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync(reviewController.destroyReview))

module.exports= router;