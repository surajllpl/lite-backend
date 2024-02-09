const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

router.post('/listings', listingController.createListing);
router.get('/listings', listingController.getAllListings);
router.get('/listings/:id', listingController.getListingById);
router.put('/listings/:id', listingController.updateListing);
router.delete('/listings/:id', listingController.deleteListing);

module.exports = router;
