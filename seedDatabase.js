const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Products');
const fs = require('fs');
const path = require('path');

// Import products data from db.json
const dbPath = path.join(__dirname, '../Frontend/data/db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Drop the collection to avoid index issues
    await mongoose.connection.db.dropCollection('products').catch(() => console.log('Collection did not exist or already dropped'));
    
    // Insert new products
    const products = data.products;
    const result = await Product.insertMany(products);
    
    console.log(`✅ Successfully seeded ${result.length} products to the database`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
