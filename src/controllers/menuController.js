const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    console.log('📋 Getting menu items...');
    const { category } = req.query;
    
    // Build query
    const query = { available: true };
    if (category && category !== 'All') {
      query.category = category.toLowerCase();
    }
    
    console.log('🔍 Query:', query);
    
    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    
    console.log(`✅ Found ${menuItems.length} menu items`);
    
    // If no items found, return empty array
    if (menuItems.length === 0) {
      console.log('⚠️ No menu items found in database');
    }
    
    res.json(menuItems);
  } catch (error) {
    console.error('❌ Error in getMenuItems:', error);
    res.status(500).json({ 
      message: 'Server error loading menu items', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get single menu item
exports.getMenuItem = async (req, res) => {
  try {
    console.log(`📋 Getting menu item with ID: ${req.params.id}`);
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Menu item ID is required' });
    }
    
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    console.log(`✅ Found menu item: ${menuItem.name}`);
    res.json(menuItem);
  } catch (error) {
    console.error('❌ Error in getMenuItem:', error);
    res.status(500).json({ 
      message: 'Server error loading menu item', 
      error: error.message 
    });
  }
};

// Create menu item (for admin)
exports.createMenuItem = async (req, res) => {
  try {
    console.log('📝 Creating new menu item:', req.body);
    
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    
    console.log(`✅ Menu item created: ${menuItem.name}`);
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('❌ Error creating menu item:', error);
    res.status(400).json({ 
      message: 'Error creating menu item', 
      error: error.message 
    });
  }
};

// Update menu item (for admin)
exports.updateMenuItem = async (req, res) => {
  try {
    console.log(`📝 Updating menu item: ${req.params.id}`);
    
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    console.log(`✅ Menu item updated: ${menuItem.name}`);
    res.json(menuItem);
  } catch (error) {
    console.error('❌ Error updating menu item:', error);
    res.status(400).json({ 
      message: 'Error updating menu item', 
      error: error.message 
    });
  }
};

// Delete menu item (for admin)
exports.deleteMenuItem = async (req, res) => {
  try {
    console.log(`🗑️ Deleting menu item: ${req.params.id}`);
    
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    console.log(`✅ Menu item deleted: ${menuItem.name}`);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting menu item:', error);
    res.status(500).json({ 
      message: 'Error deleting menu item', 
      error: error.message 
    });
  }
};