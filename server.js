require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');


const { connectMySQL } = require('./config/database');
// const { connectCosmosDB } = require('./config/database');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const orderRoutes = require('./routes/order.route');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connections
connectMySQL();
// connectCosmosDB();

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is running' });
});

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;