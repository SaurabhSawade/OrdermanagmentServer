const request = require('supertest');
const mongoose = require('mongoose');
const MenuItem = require('../src/models/MenuItem');
const app = require('../src/server');

describe('Menu API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await MenuItem.deleteMany({});
  });

  describe('GET /api/menu', () => {
    it('should return empty array when no menu items', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all menu items', async () => {
      const menuItem = await MenuItem.create({
        name: 'Test Pizza',
        description: 'Delicious pizza',
        price: 12.99,
        image: 'test.jpg',
        category: 'pizza'
      });

      const res = await request(app).get('/api/menu');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Test Pizza');
    });

    it('should filter by category', async () => {
      await MenuItem.create([
        {
          name: 'Pizza 1',
          description: 'Pizza',
          price: 12.99,
          image: 'pizza.jpg',
          category: 'pizza'
        },
        {
          name: 'Burger 1',
          description: 'Burger',
          price: 9.99,
          image: 'burger.jpg',
          category: 'burger'
        }
      ]);

      const res = await request(app).get('/api/menu?category=pizza');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].category).toBe('pizza');
    });
  });

  describe('GET /api/menu/:id', () => {
    it('should return 404 for non-existent menu item', async () => {
      const res = await request(app).get('/api/menu/507f1f77bcf86cd799439011');
      expect(res.statusCode).toBe(404);
    });

    it('should return menu item by id', async () => {
      const menuItem = await MenuItem.create({
        name: 'Test Item',
        description: 'Test Description',
        price: 10.99,
        image: 'test.jpg',
        category: 'pizza'
      });

      const res = await request(app).get(`/api/menu/${menuItem._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Test Item');
    });
  });
});