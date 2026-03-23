require('dotenv').config();

const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')


const app = express()

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors())
app.use(express.json())

// DB connection
connectDB()

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Routes
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});