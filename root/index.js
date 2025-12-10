#!/bin/bash

# Initialize a new Git repository
git init

# Create project directories
mkdir -p root/server
mkdir -p root/client/src
mkdir -p root/client/public

# Create package.json for Node.js server
cat <<EOL > root/server/package.json
{
  "name": "my-app-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9",
    "dotenv": "^8.2.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}
EOL

# Create index.js for Node.js server
cat <<EOL > root/server/index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
EOL

# Create .env file for environment variables
cat <<EOL > root/server/.env
MONGODB_URI=mongodb://localhost:27017/myapp
PORT=5000
EOL

# Create package.json for React client
cat <<EOL > root/client/package.json
{
  "name": "my-app-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
EOL

# Initialize React app
cd root/client
npx create-react-app . 

# Create a basic App.js
cat <<EOL > root/client/src/App.js
import React from 'react';

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
    </div>
  );
}

export default App;
EOL

# Create a README file
cat <<EOL > root/README.md
# My App

This is a basic Node.js and React application with MongoDB.

## Getting Started

1. Navigate to the server directory and install dependencies:
   \`\`\`
   cd server
   npm install
   \`\`\`

2. Set up your MongoDB connection in the .env file.

3. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

4. Navigate to the client directory and install dependencies:
   \`\`\`
   cd client
   npm install
   \`\`\`

5. Start the client:
   \`\`\`
   npm start
   \`\`\`
EOL

# Add all files to Git
git add .
git commit -m "Initial project structure for Node.js and React application"