require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const reviews = require('./routes/reviews_route.js')

const app = express();
/**
 * ! Include express.static if required
 */
app.use(express.json());
app.use(morgan('dev'));


app.use('/reviews', reviews);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT);
console.log(`SERVER LISTENING AT http://${process.env.DB_HOST}:${PORT}`);

module.exports = app;

