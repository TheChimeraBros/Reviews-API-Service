import http from "k6/http";
import { sleep } from 'k6';

const getRandomId = (min, max) => {
  return Math.random() * (max - min) + min;
};
const randomReview = Math.floor(getRandomId(5197491, 5774937));
const randomProduct = Math.floor(getRandomId(900010, 1000011));
const apiUrl = `http://localhost:3001/reviews`;
export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 10 }, //below normal load
    { duration: '1m', target: 10 },
    { duration: '10s', target: 100 }, // normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 500 }, // around the breaking point
    { duration: '1m', target: 500 },
    { duration: '1m', target: 1000 }, // beyond the breaking point
    { duration: '1m', target: 1000 },
    { duration: '10s', target: 2000 },
    { duration: '1m', target: 2000 },
    { duration: '1m', target: 100 },// scale down. recovery stage.
  ]
};
export default () => {
  http.batch([
    ['GET',`${apiUrl}/?product_id=${randomProduct}`],
    ['GET', `${apiUrl}/meta/?product_id=${randomProduct}`]
  ])
  sleep(1); // each user will run api every 1 second
};


