const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.post('/enquiries', enquiryController.createEnquiry);
router.get('/enquiries', enquiryController.getAllEnquiries);
router.get('/enquiries/:id', enquiryController.getEnquiryById);
router.put('/enquiries/:id', enquiryController.updateEnquiry);
router.delete('/enquiries/:id', enquiryController.deleteEnquiry);

module.exports = router;
