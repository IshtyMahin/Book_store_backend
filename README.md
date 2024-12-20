# Book Store API with TypeScript, Express, and MongoDB
## Description
This is a Book Store API built using Express, TypeScript, and MongoDB with Mongoose for managing books and orders. The application allows CRUD operations on books, placing orders, and calculating total revenue using MongoDB's aggregation framework.

## Features

* CRUD Operations for Books (Product Management)    
        Create, Read, Update, Delete books.

* Order Management   
 Place an order, track the ordered book, and update inventory.  
* Revenue Calculation   
Calculate the total revenue from orders using MongoDB's aggregation pipeline.  
* Input Validation using Joi
* Code Quality with ESLint and Prettier.  
## Tech Stack
* Backend: Node.js, Express.js
* Database: MongoDB (with Mongoose for data modeling)
* Data Validation: Joi
* TypeScript: Strong typing for better maintainability.
* Code Formatting and Linting: Prettier and ESLint
* Version Control: Git
## Installation
### 1. Clone the Repository


git clone

    https://github.com/IshtyMahin/Book_store_backend.git   
    cd book-store-api
### 2. Install Dependencies
Make sure you have Node.js and npm installed. Then, run:

    npm install       

This will install all required dependencies listed in the package.json.

### 3. Environment Variables
Create a .env file in the root directory and add your MongoDB connection string and any other required configurations.

Example:

    MONGODB_URI=mongodb://localhost:27017/bookstore
PORT=3000

### 4. Build and Run
* For development, run:

        npm run start:dev    

* For production, first build the application using TypeScript and then run it:

        npm run build
        npm run start:prod
### 5. Lint and Format
* To lint the code:

      npm run lint
* To fix linting issues:



        npm run lint:fix
* To format the code with Prettier:



        npm run prettier


## API Endpoints
### 1. Create a Book
Endpoint: 
                
    POST /api/products

Request Body:

    {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true
    }

Response:

    {
    "message": "Book created successfully",
    "success": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 100,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    }
###  2. Get All Books
Endpoint: 

    GET /api/products
    Query Params: searchTerm (optional)

Response:

    {
    "message": "Books retrieved successfully",
    "status": true,
    "data": [
        {
        "_id": "648a45e5f0123c45678d9012",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 100,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
        }
    ]
    }

### 3. Get a Specific Book
Endpoint: 

    GET /api/products/:productId

Response:

    {
    "message": "Book retrieved successfully",
    "status": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 100,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    }
### 4. Update a Book
Endpoint: 

    PUT /api/products/:productId
Request Body:

    {
    "price": 15,
    "quantity": 25
    }
    Response:

    {
    "message": "Book updated successfully",
    "status": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 15,
        "category": "Fiction",
        "description": "A story about the American dream.",
        "quantity": 25,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T11:00:00.000Z"
    }
    }
### 5. Delete a Book
Endpoint: 

    DELETE /api/products/:productId

Response:

    {
    "message": "Book deleted successfully",
    "status": true,
    "data": {}
    }
### 6. Order a Book
Endpoint: 
        
    POST /api/orders
Request Body:

    {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30
    }
Response:

    {
    "message": "Order created successfully",
    "status": true,
    "data": {
        "_id": "648b45f5e1234b56789a6789",
        "email": "customer@example.com",
        "product": "648a45e5f0123c45678d9012",
        "quantity": 2,
        "totalPrice": 30,
        "createdAt": "2024-11-19T12:00:00.000Z",
        "updatedAt": "2024-11-19T12:00:00.000Z"
    }
    }
## 7. Calculate Revenue from Orders
Endpoint: 

    GET /api/orders/revenue
Response:

    {
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
        "totalRevenue": 450
    }
    }


