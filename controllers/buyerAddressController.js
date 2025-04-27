const BuyerAddress = require('../models/BuyerAddress');


exports.getAllBuyerAddresses = (req, res) => {
    res.status(200).json({ message: 'getAllBuyerAddresses' });
}


exports.getBuyerAddressByEmail = async (req, res) => {
    const { buyer_email } = req.params;
    try {
        // Simulate fetching buyer address from a database
        const buyerAddress = await BuyerAddress.findAll({ where: { buyer_email: buyer_email } });
        if (!buyerAddress) {
            return res.status(404).json([]);
        }
        res.status(200).json(buyerAddress);
    }
    catch (err) {
        console.error('Error in getBuyerAddressById:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }   
}


exports.createBuyerAddress = async (req, res) => {
  const { buyer_email, line1, line2, city, state_in, zip_code } = req.body;

  try {
    // Create the new address entry for the buyer
    const newAddress = await BuyerAddress.create({
      buyer_email,
      line1,
      line2,
      city,
      state_in,
      zip_code,
    });

    res.status(201).json({ message: "Address added successfully", newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Failed to add address" });
  }
};
    


exports.updateBuyerAddress = (req, res) => {
    res.status(200).json({ message: 'updateBuyerAddress' });
}

exports.deleteBuyerAddress = (req, res) => {
    res.status(200).json({ message: 'deleteBuyerAddress' });
}

exports.getBuyerAddressByBuyerId = (req, res) => {
    res.status(200).json({ message: 'getBuyerAddressByBuyerId' });
}