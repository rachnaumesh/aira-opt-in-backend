const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rachnaumesh:8slKr8m2u6o7fTE1@cluster0.wm56f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection successful');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
