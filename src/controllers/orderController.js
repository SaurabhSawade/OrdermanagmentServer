const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    console.log('📦 Creating order with data:', req.body);
    
    // Create order - pre-save hook will generate orderNumber
    const order = new Order(req.body);
    
    // Calculate total amount if not provided
    if (!order.totalAmount || order.totalAmount === 0) {
      let total = 0;
      order.items.forEach(item => {
        total += item.price * item.quantity;
      });
      order.totalAmount = total;
    }
    
    // Set estimated delivery time (30 minutes from now) if not set
    if (!order.estimatedDelivery) {
      const estimatedTime = new Date();
      estimatedTime.setMinutes(estimatedTime.getMinutes() + 30);
      order.estimatedDelivery = estimatedTime;
    }
    
    await order.save();
    console.log('✅ Order saved:', order._id, 'Order Number:', order.orderNumber);
    
    // Emit real-time update (safely)
    if (req.io) {
      req.io.emit('orderUpdate', {
        orderId: order._id,
        orderNumber: order.orderNumber,
        status: order.status
      });
    }
    
    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Error placing order:', error.message);
    res.status(400).json({ message: 'Error placing order', error: error.message });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('items.menuItemId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItemId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Emit real-time update
    req.io.emit('orderUpdate', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      status: order.status
    });
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

// Get order by order number (for customer tracking)
exports.getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};