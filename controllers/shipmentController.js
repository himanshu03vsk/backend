const Shipment  = require('../models/Shipment');
exports.getAllShipments = (req, res) => {
    res.status(200).json({ message: 'getAllShipments' });
};

exports.getShipmentById = (req, res) => {
    res.status(200).json({ message: 'getShipmentById' });
};

// controllers/shipmentController.js


exports.createShipment = async (req, res) => {
  const {
    order_id,
    part_id,
    color,
    quantity_purchased,
    shipment_cost,
  } = req.body;

  try {
    const shipment = await Shipment.create({
      order_id,
      part_id,
      color,
      quantity_purchased,
      shipment_cost,
      shipment_status: 'Pending', // default, can be omitted if already set as default in model
    });

    res.status(201).json({
      message: 'Shipment created successfully',
      shipment,
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateShipment = (req, res) => {
    res.status(200).json({ message: 'updateShipment' });
};

exports.deleteShipment = (req, res) => {
    res.status(200).json({ message: 'deleteShipment' });
};