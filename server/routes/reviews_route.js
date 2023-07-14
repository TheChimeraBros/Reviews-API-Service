const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  console.log('Got to 1st route');
})
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