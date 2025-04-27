const cors = require('cors');
const express = require('express');
const http = require('http'); // for Socket.IO
const { Server } = require('socket.io'); // for Socket.IO
const sequelize = require('./config/db');
const syncAllPartsToAlgolia = require('./config/sync-to-algolia');


// Importing models
const ChatMessage = require('./models/ChatMessage'); // Add at the top
const Part = require('./models/Part');
const Car = require('./models/Car');
const Person = require('./models/Person');
const Buyer = require('./models/Buyer');
const Seller = require('./models/Seller');
const Shipment = require('./models/Shipment');
const Cart = require('./models/Cart');
const Enquiry = require('./models/Enquiry');
const PaymentInfo = require('./models/Payment');
const BuyerAddress = require('./models/BuyerAddress');
const PartImage = require('./models/PartImage');
const PartSoldBy = require('./models/PartSoldBy');
const PartsOfCars = require('./models/PartsOfCars');
const Order = require('./models/Order');

// Import routes
const partRoutes = require('./routes/partRoutes');
const carRoutes = require('./routes/carRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const partSoldByRoutes = require('./routes/partSoldByRoutes');
const partsOfCarsRoutes = require('./routes/partsOfCarsRoutes');
const buyerAddressRoutes = require('./routes/buyerAddressRoutes');
const partImageRoutes = require('./routes/partImageRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Associations
Order.hasMany(Shipment, { foreignKey: 'order_id' });
Shipment.belongsTo(Order, { foreignKey: 'order_id' });
Shipment.belongsTo(Part, { foreignKey: 'part_id' });
Part.hasMany(Shipment, { foreignKey: 'part_id' });
Seller.hasMany(PartSoldBy, { foreignKey: 'seller_email' });
PartSoldBy.belongsTo(Seller, { foreignKey: 'seller_email' });

const app = express();
const server = http.createServer(app); // create HTTP server for socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes
app.use('/api/buyer', buyerRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/part-sold-by', partSoldByRoutes);
app.use('/api/parts-of-cars', partsOfCarsRoutes);
app.use('/api/buyer-addresses', buyerAddressRoutes);
app.use('/api/part-images', partImageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reset-password', authRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// WebSocket logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (email) => {
    socket.join(email);
    console.log(`${email} joined their room`);
  });

  // Assuming you're emitting a "send_message" event in socket

// server.js (Socket.IO handler)
socket.on('send_message', async (data) => {
  const { sender_email, receiver_email, message } = data;

  if (!receiver_email || !sender_email || !message) {
    console.error("Missing required data:", data);
    return;
  }

  try {
    // Save the message in the database
    const savedMessage = await ChatMessage.create({
      sender_email,
      receiver_email,
      message,
      timestamp: new Date(), // Sequelize can default this too
    });

    // Emit confirmation back to sender
    socket.emit('message_sent', savedMessage);

    // Send the message to the receiver’s room
    socket.to(receiver_email).emit('receive_message', savedMessage);

  } catch (error) {
    console.error('Error saving chat message:', error);
    socket.emit('message_error', { message: 'Failed to save message to DB.' });
  }
});



  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Syncing database and starting the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQL Server has been established successfully.');
    await sequelize.sync();
    console.log('Models synced successfully.');

    if (process.env.SYNC_ALGOLIA === 'true') {
      await syncAllPartsToAlgolia();
    }

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1);
});
