const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FoodItem = require('./models/FoodItem');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')

// Create new food items (accepts an array of items)
app.post('/food-items', async (req, res) => {
    try {
        const items = req.body;
        if (Array.isArray(items)) {
            const savedItems = await FoodItem.insertMany(items);
            res.status(201).json(savedItems);
        } else {
            const newItem = new FoodItem(items);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Retrieve all food items
app.get('/food-items', async (req, res) => {
    try {
        console.log('Received request for /food-items');
        const items = await FoodItem.find().limit(100);
        console.log('Fetched items from database');
        res.status(200).json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(400).json({ error: err.message });
    }
});

// Retrieve a specific food item by ID
app.get('/food-items/:id', async (req, res) => {
    try {
        const item = await FoodItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a food item
app.put('/food-items/:id', async (req, res) => {
    try {
        const updatedItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a food item
app.delete('/food-items/:id', async (req, res) => {
    try {
        const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Food item not found' });
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
