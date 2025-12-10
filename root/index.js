const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'your_mongodb_connection_string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.get('/api/health', (req, res) => {
    res.status(200).send('API is healthy');
});

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Heroku Postbuild script in package.json
// "scripts": {
//     "start": "node server.js",
//     "heroku-postbuild": "cd client && npm install && npm run build"
// }