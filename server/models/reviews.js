// import the connection module
const db = require("../db.js");
exports.getAllReviews = (queryParameters) => {
  /**
   * ! Figure out Sorting
   * ! FIX FORMATTING OF DATE
   */
  let { page, count, sort, product_id } = queryParameters;
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
    WHERE r.product_id = $1 AND r.reported = false
    GROUP BY r.id
    LIMIT $2 OFFSET $3
    `;
  return db.query(queryStr, [product_id, count, offset ]);
};

exports.findMetaData = (queryParameters) => {
  const { product_id } = queryParameters;
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
  const queryStr = `UPDATE reviews AS r
  SET helpfulness = helpfulness + 1
  WHERE r.id = $1`;
  return db.query(queryStr, [reviewId]);
};
exports.updateReviewReport = async(reviewId) => {
  const queryStr = `UPDATE reviews AS r
  SET reported = true
  WHERE r.id = $1`;
  return await db.query(queryStr, [reviewId]);
}

// function that will post to reviews
exports.addReview = async (request) => {
  console.log('BODY',request);
  const {
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
  } = request;
  const date = new Date().getTime();
  console.log('PHOTOS', photos, characteristics,email);
  try {
    const reviewStr = `
  INSERT INTO reviews AS r
  (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id`;
    const {rows} = await db.query(reviewStr, [
      product_id,
      rating,
      date,
      summary,
      body,
      recommend,
      name,
      email,
    ]);
    const id = rows[0].id;
    const photosQueryStr = `INSERT INTO reviews_photos
  (review_id, url)
  VALUES($1, $2)`;
    photos.forEach(async (photo) => {
      await db.query(photosQueryStr, [id, photo]);
    });
    const charQueryStr = `
  INSERT INTO characteristic_reviews
  (characteristic_id,review_id,value)
  VALUES ($1, $2, $3)
  `;
    for (key in characteristics) {
      await db.query(charQueryStr, [key, id, characteristics[key]]);
    }
    return;
  } catch (err) {
    throw err;
    console.log(err);
  }
};

// request or parameters
// given the request body use the data to insert into the necessary tables.

//another function that will do put request to reviews table to update helpful count
// another function that will update a report column in table
