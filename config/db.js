const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    })
    console.log('Database Connected..!')
  } catch (err) {
    console.error('Database Connection Error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB;