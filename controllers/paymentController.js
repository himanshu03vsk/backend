const Payment = require('../models/Payment');
const Buyer = require('../models/Buyer'); // Assuming you have a Buyer model defined


exports.getAllPayments = (req, res) => { 


    res.status(200).json({'message': 'get all payments'})
};

exports.getPaymentByEmail = async (req, res) => {

    const { buyer_email } = req.params;

    if (!buyer_email) return res.status(400).json({ message: 'Email is required' });
    try {
        const payment = await Payment.findAll({ where: { buyer_email: buyer_email } });
        if (!payment) return res.status(404).json([]);
        res.status(200).json(payment);
    }
    catch (err) {
        console.error('Error in getPaymentByEmail:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


exports.createPayment = async (req, res) => {
  const {
    buyer_email,
    card_no,
    card_exp_date,
    card_cvv,
    card_name,
    card_address
  } = req.body;

  try {
    // 1. Validate required fields
    if (!buyer_email || !card_no || !card_exp_date || !card_cvv || !card_name || !card_address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Validate Card Information
    if (card_no.length !== 16 || isNaN(card_no)) {
      return res.status(400).json({ message: 'Invalid card number' });
    }

    // 3. Validate Card Expiry Date (must be in the future)
    const today = new Date();
    const expDate = new Date(card_exp_date);
    if (expDate <= today) {
      return res.status(400).json({ message: 'Card has expired' });
    }

    // 4. Validate CVV (should be a 3-digit number)
    if (card_cvv.toString().length !== 3 || isNaN(card_cvv)) {
      return res.status(400).json({ message: 'Invalid CVV' });
    }

    // 5. Check if the buyer exists in the buyer table using Sequelize's findOne method
    const buyer = await Buyer.findOne({ where: { buyer_email } });

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    // 6. Insert the payment information using Sequelize's create method
    const payment = await Payment.create({
      buyer_email,
      card_no,
      card_exp_date,
      card_cvv,
      card_name,
      card_address
    });

    // 7. Return success response with the payment method number (method_no)
    return res.status(201).json({
      message: 'Payment method created successfully',
      method_no: payment.method_no
    });

  } catch (error) {
    console.error('Error creating payment:', error.message);
    return res.status(500).json({ message: 'An error occurred while processing payment' });
  }
};


exports.updatePayment = (req, res) => {
    res.status(200).json({'message': 'update payment'})
}



exports.deletePayment = async (req, res) => {
  const { method_no } = req.params;  // Retrieve the method_no from the URL parameter

  try {
    // Check if the payment exists by method_no
    const payment = await Payment.findOne({ where: { method_no } });

    if (!payment) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    // Delete the payment record
    await payment.destroy();

    // Return success response
    return res.status(200).json({ message: 'Payment method deleted successfully' });

  } catch (error) {
    console.error('Error deleting payment:', error.message);
    return res.status(500).json({ message: 'An error occurred while deleting the payment' });
  }
};
