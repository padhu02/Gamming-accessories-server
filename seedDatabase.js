require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Products');
const fs = require('fs');
const path = require('path');

// Import products data from db.json
const dbPath = path.join(__dirname, '../Frontend/data/db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const seedDatabase = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📍 URI:', process.env.MONGODB_URI?.substring(0, 50) + '...');
    
    // Set connection timeout
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Drop the collection to avoid index issues
    try {
      await mongoose.connection.db.dropCollection('products');
      console.log('🗑️  Dropped existing products collection');
    } catch (err) {
      if (err.code !== 26) { // 26 = collection doesn't exist
        throw err;
      }
      console.log('ℹ️  Products collection did not exist');
    }
    
    // Insert new products
    const products = data.products;
    console.log(`📦 Inserting ${products.length} products...`);
    const result = await Product.insertMany(products);
    
    console.log(`✅ Successfully seeded ${result.length} products to the database`);
    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error('\n⚠️  TROUBLESHOOTING:');
    console.error('1. Check MongoDB Atlas cluster is RUNNING (not paused)');
    console.error('2. Whitelist your IP in Network Access: 0.0.0.0/0');
    console.error('3. Verify credentials: Padhu:Padhu2002');
    console.error('\n💡 Alternative: Use LOCAL MongoDB:');
    console.error('   Change .env to: MONGODB_URI=mongodb://localhost:27017/ecommerce');
    console.error('   Install MongoDB locally or use Docker\n');
    process.exit(1);
  }
};

seedDatabase();
