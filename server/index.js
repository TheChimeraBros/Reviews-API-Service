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
app.get('/loaderio-dd6de4a7462fff0d608166cf16309c6e.txt', (req,res) => {
  res.status(200).send('loaderio-dd6de4a7462fff0d608166cf16309c6e');
})
const PORT = process.env.SERVER_PORT || 3000;
console.log(process.env.SERVER_PORT);
app.listen(PORT);
console.log(`SERVER LISTENING AT http://${process.env.DB_HOST}:${PORT}`);

module.exports = app;

