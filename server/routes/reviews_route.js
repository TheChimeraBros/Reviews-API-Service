const express = require("express");
const router = express.Router();
const { getReviews } = require("../controllers/reviews");

router.get("/", (req, res) => {
  console.log("Got to 1st route");
  getReviews(req, res);
  // request will come in with query parameters
  // req.query returns the parameters access the parsed query string
  // req.param will access teh parsed route parameters
  // send the query parameter to controller function
  // the controller function can send teh query parameters to teh model
  /**
   * !Controller will return the query parameters + the results array from query to
   * ! database.
   */
});

router.get("/meta", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:review_id/helpful", (req, res) => {
  /**
   * ! Placeholder Param is not correct
   */
});

router.put("/:review_id/report", (req, res) => {});
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
