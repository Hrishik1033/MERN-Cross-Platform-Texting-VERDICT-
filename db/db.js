const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
async function connectDb(){
    await mongoose.connect(MONGO_URI)
    console.log('Database connected')
}

module.exports = connectDb