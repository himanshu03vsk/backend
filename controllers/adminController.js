const { Op, Sequelize } = require('sequelize');
const Order = require('../models/Order');
const Shipment = require('../models/Shipment');
const Part = require('../models/Part');
const Buyer = require('../models/Buyer');
const Person = require('../models/Person'); // Assuming this is your user profile model
const ChatMessage = require('../models/ChatMessage');

// Set your admin email here or use an environment variable
const ADMIN_EMAIL = 'himanshu03vsk@gmail.com';

// ========================
// ORDER MANAGEMENT
// ========================

// Get all orders with shipments and parts
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Shipment,
          include: [Part],
        },
      ],
      order: [['order_date', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific order by ID with Buyer info
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: Buyer },
        {
          model: Shipment,
          include: [Part],
        },
      ],
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all shipments for a specific order
exports.getShipmentsByOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const shipments = await Shipment.findAll({
      where: { order_id: orderId },
      include: [Part],
    });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch shipments' });
  }
};

// Update shipment status
exports.updateShipmentStatus = async (req, res) => {
  const { shipmentId } = req.params;
  const { status } = req.body;
  try {
    const shipment = await Shipment.findByPk(shipmentId);
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });

    shipment.shipment_status = status;
    await shipment.save();

    res.json({ message: 'Shipment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating shipment' });
  }
};

// ========================
// CHAT MANAGEMENT
// ========================

// Get all messages between admin and a specific user
exports.getMessagesByUser = async (req, res) => {
  const {email} = req.params;
  console.log(ADMIN_EMAIL)
  console.log(email)


  try {
    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { sender_email: email, receiver_email: ADMIN_EMAIL },
          { sender_email: ADMIN_EMAIL, receiver_email: email },
        ],
      },
      order: [['timestamp', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

// Save a new chat message (can be used for fallback HTTP POST)
exports.saveChatMessage = async (req, res) => {
  const { sender_email, receiver_email, message } = req.body;

  if (!sender_email || !receiver_email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newMessage = await ChatMessage.create({
      sender_email,
      receiver_email,
      message,
      timestamp: new Date(),
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ message: 'Failed to save chat message' });
  }
};

// Get all messages involving a user (sent or received)
exports.getChatMessageByUserEmail = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { sender_email: userEmail },
          { receiver_email: userEmail },
        ],
      },
      order: [['timestamp', 'ASC']],
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found.' });
    }

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error while fetching messages.' });
  }
};

// Get distinct users who have messaged the admin
exports.getUsersWhoMessagedAdmin = async (req, res) => {
    try {
      const messages = await ChatMessage.findAll({
        where: {
          receiver_email: ADMIN_EMAIL,
          sender_email: { [Op.ne]: ADMIN_EMAIL } // exclude admin if somehow present
        },
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('sender_email')), 'sender_email'],
        ],
      });
  
      const users = messages.map((msg) => msg.get('sender_email'));
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };
