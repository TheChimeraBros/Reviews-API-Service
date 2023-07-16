// import the connection module
const db = require("../db.js");
exports.getAllReviews = (queryParameters) => {
  /**
   * ! Figure out Sorting
   */
    let {page, count, sort, product_id} = queryParameters;
    console.log(queryParameters);
    console.log(count);
    page = page || 1;
    count = count || 5;
    sort =  sort || null;
    const offset = ((page -1) * 5);
    const queryStr = `SELECT
    r.id AS review_id,
    r.rating,
    r.summary,
    r.body,
    r.date,
    r.reviewer_name,
    r.helpfulness,
    COALESCE(json_agg(json_build_object('id', rp.id, 'url', rp.url)), '[]' ::json) AS photos
    FROM reviews AS r
    LEFT OUTER JOIN reviews_photos AS rp ON r.id = rp.review_id
    WHERE r.product_id = ${product_id}
    GROUP BY r.id
    LIMIT ${count} OFFSET ${offset}
    `
    return db.query(queryStr);
};




















// create functions that query the database for the necessary rows
// return the results of the query
// I need a function that will return all reviews for a product with the given a parameters like
// page, count, sort, product_id
// another function that will get the review metadata
// parameters are product id
// function that will post to reviews
// request or parameters
// given the request body use the data to insert into the necessary tables.
//another function that will do put request to reviews table to update helpful count
// another function that will update a report column in table
