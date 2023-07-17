const { getAllReviews, findMetaData, updateHelpfulness  } = require("../models/reviews.js");

exports.getReviews = (req, res) => {
  console.log('Controller');
  getAllReviews(req.query).then((result) => {
    res.status(200).send(result.rows);
  })
  .catch((err) => {
    res.status(400).send(err);
  });

};

exports.getMetaData = (req, res) => {
  findMetaData(req.query)
  .then((results) => {
    const{metadata} = results.rows[0];
    res.status(200).send(metadata);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}
exports.putReviewHelpfulness = (req, res) => {
  console.log(req.params.review_id);
  updateHelpfulness(req.params.review_id)
  .then((result) => {
    console.log('DONE');
    res.status(200).send();
  })
  .catch((err) => {
    res.status(400).send(err);
  });
}