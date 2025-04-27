const express = require('express');
const router = express.Router();
const EnquiryController = require('../controllers/enquiryController');



router.get('/', EnquiryController.getAllEnquiries); // Get all enquiries
router.post('/', EnquiryController.createEnquiry); // Create a new enquiry


module.exports = router;