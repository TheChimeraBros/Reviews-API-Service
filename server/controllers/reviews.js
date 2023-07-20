const {
  getAllReviews,
  findMetaData,
  updateHelpfulness,
  addReview,
  updateReviewReport,
} = require("../models/reviews.js");

exports.getReviews = (req, res) => {
  getAllReviews(req.query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getMetaData = (req, res) => {
  findMetaData(req.query)
    .then((results) => {
      const { metadata } = results.rows[0];
      res.status(200).send([metadata]);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.postReview = async (req, res) => {
  try {
    await addReview(req.body);
    res.status(201).send({message:'Data went through'});
  } catch (err) {
    res.status(400).send(err);
  }
};
exports.putReviewHelpfulness = (req, res) => {
  updateHelpfulness(req.params.review_id)
    .then((result) => {
      res.status(204).send("NO CONTENT");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.putReviewReport = async (req, res) => {
  try {
    await updateReviewReport(req.params.review_id);
    res.status(204).send("NO CONTENT");
  } catch (err) {
    res.status(400).send(err);
  }
};
