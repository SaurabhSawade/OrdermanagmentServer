const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Public routes
router.post('/', orderController.placeOrder);
router.get('/track/:orderNumber', orderController.getOrderByNumber);

// Protected routes (simplified for demo)
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;