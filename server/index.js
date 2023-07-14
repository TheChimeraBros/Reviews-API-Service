require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const reviews = require('./routes/reviews_route.js')

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/reviews', reviews);
// one route /reviews which has query parameters
    // '/' main query to get all reviews with parameters
    // within /meta
    // '/' for post
    // to PUT requests with review id to update helpful or report
      // '/review/report or helpful'

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT);
console.log(`SERVER LISTENING AT http://localhost:${PORT}`);



/**
 ** Create a main endpoint route that will take to router file
 ** create file for meta data route and reviews route
 *? what middlewares to use?
 *! get in morgan middleware to log
 ** Create  a function To log what kind of requests are coming in.
 *! express.json , to parse incoming requests
 *! express static to load html files , can be used when front end is imported
 *
 * TODO: import morgan , create morgan logger function
 * TODO: import express.json
 * TODO: import express.router
 * * select port to listen to
 *
 *!TO use middleware you have use the app.use method
 */