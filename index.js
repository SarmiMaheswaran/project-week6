const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const FoodItem = require('./models/FoodItem');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodNutritionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
});

// API Endpoints...

// Export the Express app as a module
module.exports = app;
