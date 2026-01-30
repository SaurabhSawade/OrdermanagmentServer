🍔 Order Management System – Food Delivery App

A full-stack Order Management feature for a food delivery application, built as part of a Senior Full Stack Developer assessment.
The project demonstrates clean architecture, real-time updates, test-driven development, and production deployment.

⸻

🔗 Live Demo
	•	Frontend: https://ordermanagementclient.vercel.app
	•	Backend API: https://ordermanagmentserver.onrender.com

-> Frontend GithubRepo
    • https://github.com/SaurabhSawade/Ordermanagementclient.git

📽️ Loom Walkthrough (12–15 mins):
👉 Link to Loom video here
https://www.loom.com/share/432e20a967db4063b8925cec374bdf2b
   
⸻

🧩 Features Overview

✅ Menu Display
	•	Browse food items with name, description, price, image, and category
	•	Filter menu items by category

✅ Cart & Checkout
	•	Add/remove items from cart
	•	Update item quantities
	•	Cart state managed globally using React Context
	•	Checkout form for delivery details (name, address, phone)

✅ Order Placement
	•	Place orders via REST API
	•	Backend calculates total amount securely
	•	Unique order number generated per order

✅ Order Status Tracking
	•	Track order status (Order Received → Preparing → Out for Delivery → Delivered)
	•	Visual progress timeline with active step highlighting

✅ Real-Time Updates
	•	Order status updates delivered in real-time using Socket.io
	•	Simulates real food delivery workflows

✅ Testing (TDD)
	•	Backend tests for menu and order APIs
	•	Frontend component tests using React Testing Library

⸻

🏗️ Architecture & Design

Frontend
	•	React + Vite
	•	Context API for cart state
	•	Modular, reusable components
	•	Responsive UI with Tailwind CSS

Backend
	•	Node.js + Express
	•	MongoDB + Mongoose
	•	RESTful API design
	•	Socket.io for real-time communication
	•	Clean separation of routes, controllers, and models

State Management
	•	Single source of truth for cart state
	•	Predictable UI behavior
	•	Avoids prop drilling and race conditions

🔌 API Endpoints

Menu
	•	GET /api/menu – Get all menu items
	•	GET /api/menu?category=pizza – Filter by category
	•	GET /api/menu/:id – Get menu item by ID

Orders
	•	POST /api/orders – Place a new order
	•	GET /api/orders/:orderNumber – Fetch order details
	•	PUT /api/orders/:id/status – Update order status

⸻

🧪 Testing Strategy (TDD)

Backend
	•	Jest + Supertest
	•	Covers:
	•	Menu retrieval
	•	Order creation
	•	Input validation
	•	Status updates

Frontend
	•	React Testing Library
	•	Covers:
	•	Component rendering
	•	UI behavior
	•	Cart interactions

Testing focuses on business-critical flows, not just snapshots.

⸻

🚀 Deployment

Backend
	•	Hosted on Render
	•	Environment-based configuration
	•	Production-safe start command
	•	Clean dependency management

Frontend
	•	Hosted on Vercel / Netlify
	•	Optimized Vite build
	•	Environment-based API URLs
