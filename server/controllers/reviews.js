const { getAllReviews } = require("../models/reviews.js");

exports.getReviews = (req, res) => {
  console.log('Controller');
  getAllReviews(req.query).then((result) => {
    res.status(200).send(result.rows);
  });

};
