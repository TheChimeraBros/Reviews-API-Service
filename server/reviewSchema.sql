DROP DATABASE IF EXISTS "reviews_API"
CREATE DATABASE "review_API";


CREATE TABLE reviews(
 id BIGSERIAL PRIMARY KEY,
 product_id BIGINT,
 date BIGINT,
 summary TEXT,
 body TEXT,
 recommend BOOLEAN,
 reported BOOLEAN,
 reviewer_name CHARACTER VARYING(250),
 reviewer_email TEXT,
 response TEXT,
 helpfulness INTEGER
);
CREATE TABLE characteristics (
 id SERIAL PRIMARY KEY,
 product_id INTEGER,
name character varying(250)
);

CREATE TABLE characteristic_reviews(
  id SERIAL PRIMARY KEY,
  characteristic_id BIGINT references reviews(id),
  value SMALLINT
);

CREATE TABLE reviews_photos(
  id SERIAL PRIMARY KEY,
  review_Id BIGINT references reviews(id),
  url TEXT
);
