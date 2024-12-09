Food Delivered MERN Stack
Overview
Food Delivered is a feature-rich food delivery application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It combines modern technologies with clean UI/UX to provide an intuitive and efficient food ordering experience. This project demonstrates expertise in both frontend and backend development, leveraging advanced operations and secure integrations.

Features
Frontend
Cloudinary Integration:
Allows users to upload images for profiles, menus, and restaurant details seamlessly.

Profile Management:
Enables users to update and manage their profile with ease.

Dark Mode/Light Mode:
Integrated theme toggling to enhance user experience, built using shadcn components.

TypeScript Integration:
Ensures robust type-checking for better maintainability and reliability of the frontend codebase.

Backend
Advanced MongoDB Operations:

Implements efficient filtering, searching, and pagination for handling large datasets.
Authentication:

Two-way OTP-based authentication for login and order confirmations.
Stripe Payment Gateway:

Secure and seamless payment integration for order transactions.
CRUD Operations:

Restaurant Management: Create, read, update, and delete restaurant data.
Menu Management: Manage menu items dynamically with CRUD capabilities.
Cart and Order Management:

Add items to the cart, update orders in real-time, and manage order statuses.
Technology Stack
Frontend
React.js
TypeScript
TailwindCSS
Shadcn components
Axios
Backend
Node.js
Express.js
MongoDB
Cloudinary
Stripe
How to Run the Project
Clone the repository:

bash
Copy code
git clone https://github.com/nitingoley/food-mern-stack.git
Install dependencies for both frontend and backend:

bash
Copy code
# Backend
cd server
npm install

# Frontend
cd client
npm install
Configure environment variables:

Set up your .env file for both frontend and backend.
Backend variables:
PORT: Port number for the server (e.g., 5000).
MONGO_URL: MongoDB connection string.
JWT_SECRET: Secret key for JSON Web Tokens.
CLOUDINARY_URL: Cloudinary configuration.
STRIPE_SECRET_KEY: Your Stripe secret key.
MAIL_TRAP = YOUR MAIL key
Run the application:

bash
Copy code
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
Access the application:

Open your browser and navigate to http://localhost:3000.
