import request from 'supertest';
import app from '../index.js';

const getRandomId = (min, max) => {
  return Math.random()*(max- min) +min;
}
900010
const randomReview = Math.floor(getRandomId(5197491,5774937));
const randomProduct = Math.floor(getRandomId(900010,1000011));
describe ("test getting reviews route ", () => {
  test("Should return 5 reviews")
})