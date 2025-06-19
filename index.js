const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db')

const emailRoutes = require('./routes/emailRoutes');

const app = express();
db()
app.use(cors());
app.use(express.json());


app.use('/', emailRoutes);

app.listen(8000, () => console.log('Server running on port 8000'));
