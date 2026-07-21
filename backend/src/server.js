require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/db');
const errorHandler = require('./middleware/errorHandler.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', recipeRoutes);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));