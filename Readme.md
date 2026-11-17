# Inventory Management System

## Project Overview
The Inventory Management System is a RESTful API built using Node.js, Express.js, MongoDB, and Mongoose. It helps manage products, stock quantities, product categories, and inventory reports.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Postman

## Features
- Create new products
- View all products
- Search products by ID
- Update product details
- Delete products
- Increase or decrease stock safely
- Low-stock alerts
- Category-wise inventory summary using aggregation
- Product filtering
- Sorting and pagination
- Input validation
- Centralized error handling

## Project Structure
```text
Inventory-Management-System/
├── config/
│   └── db.js
├── controllers/
│   └── productController.js
├── middleware/
│   ├── errorHandler.js
│   └── validateProduct.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── .env
├── .gitignore
├── server.js
├── package.json
└── package-lock.json
```

## Installation

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Configure the `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
```

5. Start MongoDB.
6. Run the application:

```bash
npm run dev
```

## Base URL

`http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/products | Create product |
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| PATCH | /api/products/:id/stock | Adjust stock |
| GET | /api/products/low-stock | Low-stock report |
| GET | /api/products/category-summary | Category summary |

## Testing
All API endpoints can be tested using Postman.

## Database
Database Name: `inventory_db`

Collection Name: `products`

## Author
Student Project – Web Development III