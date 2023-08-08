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
