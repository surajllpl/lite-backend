const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:id', reviewController.getReviewById);
router.put('/reviews/:id', reviewController.updateReviewById);
router.delete('/reviews/:id', reviewController.deleteReviewById);

module.exports = router;