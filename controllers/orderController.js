// routes/orderRoutes.js (or wherever you're organizing your routes)
const express = require('express');
const router = express.Router();
const Order  = require('../models/Order'); // Adjust the path to your Order model
const Shipment = require('../models/Shipment'); // Adjust the path to your Shipment model
const Part = require('../models/Part'); // Adjust the path to your Part model
// import emailjs from 'emailjs-com';



exports.createOrder = async (req, res) => {

// Create a new order
  try {
    const { buyer_email, shipping_address, payment_method } = req.body;

    if (!buyer_email || !shipping_address || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newOrder = await Order.create({
      buyer_email,
      shipping_address,
      payment_method,
    });

    return res.status(201).json({ order_id: newOrder.order_id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getOrderByEmail = async (req, res) => {
  const { buyer_email } = req.params;

  try {
    const orders = await Order.findAll({
      where: { buyer_email },
      order: [['order_date', 'DESC']],
      include: [
        {
          model: Shipment,
          include: [
            {
              model: Part
              }
          ]
        }
      ]
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error fetching orders with shipments:', err);
    res.status(500).json({ error: 'Internal server error while fetching orders.' });
  }
};
