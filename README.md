# Reviews-API-Service
<h1>Reviews API Service</h1>
<p>
The Reviews API has been refractored as a microservice from the existing monolithic API for the e-commerce website, Atelier. It responds to several RESTful endpoints and has been optimized to handle web-scale traffic.
</p>
<h2>
Optimizations:
</h2>
<ul>
  <li>
    Implemented an ETL process to migrate over 5GB/13M+ entries into a redesigned postgreSQL database.
  </li>
  <li>
    Scaled horizontally to a micro-service architecture with 5 AWS EC2 instances.
  </li>
  <li>
    Installed an NGINX load balancer to distribute traffic across servers and utilize proxy_caching.
  </li>
</ul>
<h2>Stress Testing</h2>
<h3>Randomized selection from bottom 10% of 13M+ entry dataset @1000RPS</h3>

| Optimization  | Requests Per Sec | Avg. Response Time| Error % |
| ------------- | ------------- | ------------|-------|
| EC2 Express Server W/PostgreSQL on AWS | 1000| 4423 ms | 34.3
| EC2 Ecpress Server W/NGINX Load Balancer  | 1000  | Fail| Fail| 100.00
| 2 EC2 Express Server W/NGNIX Load Balancer | 1000 | 362ms | 13.1 
| 2 EC2 Express Server W/NGNIX Load Balancer W/ Proxy Cache| 1000 | 43ms | 0
| 3 EC2 Express Server W/NGNIX Load Balancer W/ Proxy Cache| 2500 | 211ms | 4.2
<h2>Getting Started</h2>

<p>1. Clone the Repository</p>
  <pre><code>git clone https://github.com/TheChimeraBros/Reviews-API-Service.git</code></pre>

  <p>2. Install Dependencies</p>
  <pre><code>npm install</code></pre>

  <p>3. Follow the instructions in the README file located in the <code>server</code> folder to set up the database.</p>

  <p>4. Configure Environment Variables</p>
  <p>Create a <code>.env</code> file based on the <code>example.env</code> file.</p>

  <p>5. Start the Server</p>
  
<h2>To run the tests</h2>
<pre><code>npm run test</code></pre>

<h2>API Endpoints</h2>
<h3>GET/reviews/</h3>
<p>Query Parameters</p>
<p> Parameters should be query strings.</p>

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| page      | integer | Product for which to retrieve questions. |
| count     | integer | Specifies how many results per page to return. Default 5 |
| sort | text | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"|
| product_id | integer | Specifies the product for which to retrieve reviews.|

<h3>Response status: 200 OK</h3>
<pre><code>
  {
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}
</code></pre>
<h3>GET/reviews/meta/</h3>

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| product_id | integer | Specifies the product for which to retrieve reviews.|

<pre><code>
  {
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}
</code></pre>
