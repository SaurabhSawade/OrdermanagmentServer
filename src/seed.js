const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const menuItems = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "pizza"
  },
  {
    name: "Pepperoni Pizza",
    description: "Pizza topped with pepperoni and mozzarella cheese",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "pizza"
  },
  {
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "burger"
  },
  {
    name: "Veggie Burger",
    description: "Plant-based patty with avocado and fresh vegetables",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "burger"
  },
  {
    name: "Spaghetti Carbonara",
    description: "Pasta with eggs, cheese, pancetta, and black pepper",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "pasta"
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "salad"
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62dadadf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "dessert"
  },
  {
    name: "Fresh Lemonade",
    description: "Refreshing homemade lemonade",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "drink"
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB!');
    
    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    // Insert new data
    await MenuItem.insertMany(menuItems);
    console.log('Database seeded successfully!');
    console.log(`${menuItems.length} menu items added.`);
    
    // Show what was added
    const allItems = await MenuItem.find();
    console.log('\nMenu Items in database:');
    allItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}): $${item.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();