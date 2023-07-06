const express = require('express');
const bodyParser = require('body-parser');
const tourCardRoutes = require('./routes/tourCardRoutes');
const tourRoutes = require('./routes/tourRoutes');
const connectDatabase = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
connectDatabase();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/tourCards', tourCardRoutes);
app.use('/tours', tourRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
