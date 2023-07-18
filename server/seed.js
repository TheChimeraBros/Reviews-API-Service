// load database with csv files
const client = require('./db.js');
require("dotenv").config();

client.connect()
  .then(()=>console.log('Connected'))
  .then(()=> {
    client.query(`DROP TABLE IF EXISTS characteristics CASCADE`)
    console.log('Dropped');
    client.query(`
      CREATE TABLE characteristics (
        id SERIAL PRIMARY KEY,
        product_id INTEGER,
      name character varying(250)
      )`
    );
    console.log('Table created char');
  })
  .then(() => {
    let queryStr = `COPY characteristics FROM '${process.env.characteristicsFilePath}' WITH DELIMITER ',' CSV HEADER`;
    return client.query(queryStr);
  })
  .then(()=> {
    client.query(`DROP TABLE IF EXISTS reviews CASCADE`)
    client.query(
     `CREATE TABLE reviews(
      id BIGSERIAL PRIMARY KEY,
      product_id BIGINT,
      rating SMALLINT,
      date BIGINT,
      summary TEXT,
      body TEXT,
      recommend BOOLEAN,
      reported BOOLEAN,
      reviewer_name CHARACTER VARYING(250),
      reviewer_email TEXT,
      response TEXT,
      helpfulness INTEGER
     )`
    );
    console.log('Table created reviews');
  })
  .then(() =>{
    let queryStr = `COPY reviews FROM '${process.env.reviewsFilePath}' WITH DELIMITER ',' CSV HEADER`;
    return client.query(queryStr);
  })
  .then(() => {
    client.query(`DROP TABLE IF EXISTS characteristic_reviews CASCADE`)
    client.query(
      `CREATE TABLE characteristic_reviews(
        id SERIAL PRIMARY KEY,
        characteristic_id INTEGER references characteristics(id),
        review_id BIGINT references reviews(id),
        value SMALLINT
      )`
    );
    console.log('Table created char review');
  })
  .then(() => {
    let queryStr = `COPY characteristic_reviews FROM '${process.env.characteristicsReviewFilePath}' WITH DELIMITER ',' CSV HEADER`;
    return client.query(queryStr);
  })
  .then(() => {
    client.query(`DROP TABLE IF EXISTS reviews_photos CASCADE`)
    client.query(
      `CREATE TABLE reviews_photos(
        id SERIAL PRIMARY KEY,
        review_Id BIGINT references reviews(id),
        url TEXT
      )`
    );
    console.log('Table created REVIEW PHOTO');
  })
  .then(() => {
    let queryStr = `COPY reviews_photos FROM '${process.env.reviewPhotoFilePath}' WITH DELIMITER ',' CSV HEADER`;
    console.log('ALL COPYING DONE')
    return client.query(queryStr);
  })
  .catch((err)=> {
    console.log('ERR', err)
    client.end();
  })

/**
 *  client.query(`
  CREATE INDEX reviews_index
  ON reviews (id, product_id)
`)
 *
 */

































// after creating connection I can query to copy data from file into tables
// create tables if they don't exist.
// every query is asycn
  // try doing a try and catch
  // const connectionToDB = async() => {
  //   try {
  //     return db.connect();
  //     console.log('Connection established');
  //   } catch (error) {
  //     console.log('Error in creating connection', error)
  //   }
  // }


  // const copyDataToTables = async () => {
  //   try {
  //     const client = return db.connect();
  //     console.log('Connected to database');

  //     return client.query("INSERT INTO profile (name, email, password, age) VALUES ('girijesh', 'giri@gmail.com', 'giri', 22)");

  //     let queryStr = `COPY reviews FROM ${process.env.reviewsFilePath} WITH DELIMITER ',' CSV HEADER`;
  //     return client.query(queryStr);
  //     queryStr = `COPY characteristics FROM ${process.env.characteristicsFilePath} WITH DELIMITER ',' CSV HEADER`;
  //     return client.query(queryStr);
  //     queryStr = `COPY characteristic_reviews FROM ${process.env.characteristicsReviewFilePath} WITH DELIMITER ',' CSV HEADER`;
  //     return client.query(queryStr);
  //     queryStr = `COPY reviews_photos FROM ${process.env.reviewPhotoFilePath} WITH DELIMITER ',' CSV HEADER`;
  //     return client.query(queryStr);

  //     console.log('Data copying completed');
  //   } catch (error) {
  //     console.log('Error copying data over', error);
  //   } finally {
  //     db.end();
  //     console.log('Connection ended');
  //   }
  // };

  // copyDataToTables();