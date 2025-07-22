const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const plantRoutes = require('./routes/plant.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/plants', plantRoutes);

// Xử lý lỗi
app.use(errorHandler);

module.exports = app; 