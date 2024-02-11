const models = require("../models");

const getAllReviews = (req, res) => {
  models.review
    .findAll()
    .then(([review]) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createNewReview = (req, res) => {
  const review = req.body;
  models.review
    .addReview(review)
    .then(([result]) => {
      res.status(200);
      res.location(`/review/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createNewReview,
  getAllReviews,
};
