const dotenv = require('dotenv').config();
console.log("MONGO:", process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler.middleware');
const notFoundHandler = require('./middleware/notFound.middleware');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/api', recipeRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
