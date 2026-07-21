require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/db');

const app = express();
connectDB();

app.use(express.json());
app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));