const Enquiry = require('../models/Enquiry');


exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll();
        res.status(200).json(enquiries);
    } catch (error) {
        console.error('Error fetching enquiries:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}





exports.createEnquiry = async (req, res) => {
    try {
        const { name, email, message_subject, message, phone,  } = req.body;
        const newEnquiry = await Enquiry.create({ name, message_subject, phone, email, message });
        res.status(201).json(newEnquiry);
    } catch (error) {
        console.error('Error creating enquiry:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}