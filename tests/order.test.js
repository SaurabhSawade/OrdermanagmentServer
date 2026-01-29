const request = require('supertest');
const mongoose = require('mongoose');
const Order = require('../src/models/Order');
const MenuItem = require('../src/models/MenuItem');
const app = require('../src/server');

describe('Order API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Order.deleteMany({});
    await MenuItem.deleteMany({});
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const menuItem = await MenuItem.create({
        name: 'Test Burger',
        description: 'Delicious burger',
        price: 8.99,
        image: 'burger.jpg',
        category: 'burger'
      });

      const orderData = {
        customer: {
          name: 'John Doe',
          address: '123 Main St',
          phone: '555-0123'
        },
        items: [
          {
            menuItemId: menuItem._id,
            quantity: 2,
            price: 8.99,
            name: 'Test Burger'
          }
        ]
      };

      const res = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(res.statusCode).toBe(201);
      expect(res.body.customer.name).toBe('John Doe');
      expect(res.body.totalAmount).toBe(17.98); // 8.99 * 2
      expect(res.body.status).toBe('Order Received');
      expect(res.body.orderNumber).toBeDefined();
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          customer: {
            name: 'John Doe'
            // Missing address and phone
          }
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/orders/:id/status', () => {
    it('should update order status', async () => {
      const order = await Order.create({
        customer: {
          name: 'Jane Doe',
          address: '456 Oak St',
          phone: '555-0456'
        },
        items: [],
        totalAmount: 0,
        orderNumber: 'ORD123456'
      });

      const res = await request(app)
        .put(`/api/orders/${order._id}/status`)
        .send({ status: 'Preparing' });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Preparing');
    });

    it('should validate status value', async () => {
      const order = await Order.create({
        customer: {
          name: 'Jane Doe',
          address: '456 Oak St',
          phone: '555-0456'
        },
        items: [],
        totalAmount: 0,
        orderNumber: 'ORD123456'
      });

      const res = await request(app)
        .put(`/api/orders/${order._id}/status`)
        .send({ status: 'Invalid Status' });

      expect(res.statusCode).toBe(400);
    });
  });
});