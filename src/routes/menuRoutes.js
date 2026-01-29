const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Public routes
router.get('/', menuController.getMenuItems);
router.get('/:id', menuController.getMenuItem);

// Admin routes (would be protected in real app)
router.post('/', menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);

module.exports = router;