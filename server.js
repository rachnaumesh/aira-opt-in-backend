const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aira_opt_in', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema
const OptInSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    dataConsent: String
});

const OptIn = mongoose.model('OptIn', OptInSchema);

// API Endpoint
app.post('/api/opt-in', async (req, res) => {
    try {
        const newEntry = new OptIn(req.body);
        await newEntry.save();
        res.status(200).send({ message: 'Opt-in successful!' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving data.', error });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
