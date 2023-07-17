// import the connection module
const db = require("../db.js");
exports.getAllReviews = (queryParameters) => {
  /**
   * ! Figure out Sorting
   * ! FIX FORMATTING OF DATE
   */
  let { page, count, sort, product_id } = queryParameters;
  console.log(queryParameters);
  console.log(count);
  page = page || 1;
  count = count || 5;
  sort = sort || null;
  const offset = (page - 1) * 5;
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
    `;
  return db.query(queryStr);
};

exports.findMetaData = (queryParameters) => {
  console.log('Meta model')
  const {product_id} = queryParameters;
  const queryStr = `
    SELECT
json_build_object(

'product_id', ${product_id},
'rating', (SELECT
	json_object_agg(a.rating, a.count) AS rating
FROM (SELECT
    r.rating,
    COUNT(*) AS count
FROM
    reviews AS r
WHERE
    r.product_id = ${product_id}
GROUP BY
    r.rating)
    a),
'recommended', (
SELECT
json_object_agg(CASE WHEN rc.recommend = 'true' THEN 1 ELSE 0 END, rc.count)
FROM(SELECT
r.product_id,
r.recommend,
COUNT(*)
FROM reviews AS r
WHERE r.product_id = ${product_id}
GROUP BY r.product_id, r.recommend)rc),
'characteristics', (
	SELECT
json_object_agg(c.name, json_build_object('id', c.id, 'value', c.value)) AS char
FROM (SELECT
	c.product_id,
	c.name,
	c.id,
	AVG(cr.value) AS value
	From characteristics AS c
	LEFT OUTER JOIN characteristic_reviews AS cr ON c.id = cr.characteristic_id
	WHERE c.product_id = ${product_id}
	GROUP BY c.id, c.product_id, c.name) c)

) AS metaData`;
return db.query(queryStr);
};
exports.updateHelpfulness = (reviewId) => {
  // given the id, I can look for the that id in the reviews table and update the helpfulness by 1
    // use the update syntax to increment the helpfulness column by 1

  const queryStr =`UPDATE reviews AS r
  SET helpfulness = helpfulness + 1
  WHERE r.id = ${reviewId}`;
  return db.query(queryStr);
}

// function that will post to reviews

// request or parameters
// given the request body use the data to insert into the necessary tables.


//another function that will do put request to reviews table to update helpful count
// another function that will update a report column in table
