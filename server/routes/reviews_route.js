const express = require("express");
const router = express.Router();
const {
  getReviews,
  getMetaData,
  putReviewHelpfulness,
  postReview,
  putReviewReport,
} = require("../controllers/reviews");

router.get("/", (req, res) => {
  console.log("Got to 1st route");
  getReviews(req, res);
});

router.get("/meta/", (req, res) => {
  console.log("Got to Meta route");
  getMetaData(req, res);
});

router.put("/:review_id/helpful", (req, res) => {
  putReviewHelpfulness(req, res);
});

router.post("/", (req, res) => {
  postReview(req, res);
});
router.put("/:review_id/report", (req, res) => {
  putReviewReport(req,res);
});
/**
 * * one route /reviews which has query parameters
    // '/' main query to get all reviews with parameters
    // within /meta
    // '/' for post
    // to PUT requests with review id to update helpful or report
      // '/review/report or helpful'
 */
//
module.exports = router;
