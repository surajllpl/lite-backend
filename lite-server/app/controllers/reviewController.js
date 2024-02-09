const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const { user_id, listing_id, review } = req.body;
    const newReview = await Review.create({ user_id, listing_id, review });
    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user_id, listing_id, review } = req.body;
    const reviewToUpdate = await Review.findByPk(reviewId);
    if (!reviewToUpdate) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await reviewToUpdate.update({ user_id, listing_id, review });
    return res.status(200).json(reviewToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
