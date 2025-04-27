// carController.js
const Sequelize = require('sequelize');
const Cart = require('../models/Cart'); // Assuming you have a Cart model defined in models/cartModel.js
const Part = require('../models/Part'); // Assuming you have a Part model defined in models/partModel.js
Cart.belongsTo(Part, { foreignKey: 'part_id' });

// Function to get all cars
// exports.getCartById = async (req, res) => { 
//     const {buyer_email } = req.params;
//     // console.log(buyer_email);

//     try {
//         const cart_item = await Cart.findAll({where: { buyer_email: buyer_email }});
//         console.log(cart_item);
//         if (!cart_item || cart_item.length === 0) {
//             return res.status(200).json([]);
//         }
//         res.status(200).json(cart_item);
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' });
//     }



// };

// exports.createCart = (req, res) => { 


//     res.status(200).json({'message': 'create cart'})
// };


// exports.updateCart = (req, res) => { 


//     res.status(200).json({'message': 'update cart'})
// };


// exports.deleteCart = (req, res) => { 


//     res.status(200).json({'message': 'Delete cart'})
// };



exports.clearCart = async (req, res) => {

  const { buyer_email } = req.params;
  try {
    const deletedRows = await Cart.destroy({
      where: { buyer_email }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'No cart items found for this email' });
    }

    res.status(200).json({ message: 'Cart cleared successfully' });
  }
  catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { part_id, buyer_email, color } = req.params;
  const { quantity } = req.query; // Use query to get the quantity
  try {
    const existingItem = await Cart.findOne({
      where: {
        part_id,
        buyer_email,
        color
      }
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Ensure quantity is a number before updating
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity)) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    // Update the quantity in the DB
    await Cart.update(
      { quantity: parsedQuantity },
      {
        where: {
          part_id,
          buyer_email,
          color
        }
      }
    );
    res.status(200).json({ message: 'Cart item updated successfully' });

  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Assuming Sequelize and relationships are set up properly

exports.getCartById = async (req, res) => {
  const { buyer_email } = req.params;

  try {
    const cart_items = await Cart.findAll({
      where: { buyer_email },
      include: [{
        model: Part,
        attributes: ['price']
      }]
    });

    if (!cart_items || cart_items.length === 0) {
      return res.status(200).json([]);
    }

    const parsedCart = cart_items.map(item => ({
      part_id: item.part_id,
      buyer_email: item.buyer_email,
      quantity: parseInt(item.quantity, 10),
      color: item.color,
      unit_price: parseFloat(item.Part.price),
      total_price: parseFloat(item.quantity) * parseFloat(item.Part.price),
    }));

    res.status(200).json(parsedCart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteCartItem = async (req, res) => {
  const { part_id, buyer_email, color } = req.params;

  try {
      const deletedItem = await Cart.destroy({
          where: {
              part_id,
              buyer_email,
              color
          }
      });

      if (deletedItem) {
          return res.status(200).json({ message: 'Cart item deleted successfully' });
      } else {
          return res.status(404).json({ message: 'Cart item not found' });
      }
  } catch (error) {
      console.error('Error deleting cart item:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.addToCart = async (req, res) => {
    const { part_id, buyer_email, quantity, color } = req.body;
  
    if (!part_id || !buyer_email || !quantity || !color) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const existingItem = await Cart.findOne({
        where: {
          part_id,
          buyer_email,
          color
        }
      });
  
      if (existingItem) {
        // Ensure quantity is a number before adding
        console.log('Existing item found:', existingItem);
        console.log('quantity in db', existingItem.quantity);
        console.log('quantity passed', quantity);
        
        // Parse the quantities to ensure they are numbers before adding
        const total = parseInt(existingItem.quantity, 10) + parseInt(quantity, 10);
        
        // Update the quantity in the DB
        await Cart.update(
          { quantity: total },
          {
            where: {
              part_id,
              buyer_email,
              color
            }
          }
        );
        
        console.log('Updated existing cart item:', existingItem);
        return res.status(200).json({ message: 'Cart item updated successfully' });
      } else {
        // Create new cart item if no existing item is found
        await Cart.create({
          part_id,
          buyer_email,
          quantity: parseInt(quantity, 10), // Ensure the quantity is parsed correctly
          color
        });
  
        return res.status(201).json({ message: 'Item added to cart successfully' });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to get a car by make, model, and year


