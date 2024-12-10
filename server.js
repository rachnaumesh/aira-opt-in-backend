const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://rachnaumesh:8slKr8m2u6o7fTE1@cluster0.wm56f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Schema
const OptInSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    dataConsent: { type: String, required: true, enum: ['yes', 'no'] },
    createdAt: { type: Date, default: Date.now }
});

const OptIn = mongoose.model('OptIn', OptInSchema);

// Input validation middleware
const validateInput = (req, res, next) => {
    const { firstName, lastName, age, dataConsent } = req.body;
    
    if (!firstName || !lastName || !age || !dataConsent) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (age < 18) {
        return res.status(400).json({ message: 'Must be 18 or older' });
    }
    
    if (!['yes', 'no'].includes(dataConsent)) {
        return res.status(400).json({ message: 'Invalid consent value' });
    }
    
    next();
};

// API Endpoint
app.post('/api/opt-in', validateInput, async (req, res) => {
    try {
        const newEntry = new OptIn(req.body);
        await newEntry.save();
        res.status(200).json({ message: 'Opt-in successful!' });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ message: 'Error saving data.', error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});