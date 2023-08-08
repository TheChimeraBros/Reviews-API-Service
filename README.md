# Reviews-API-Service
<h1>Reviews API Service</h1>
The Questions and Answers API has been refractored as a microservice from the existing monolithic API for the e-commerce website, Atelier. It responds to several RESTful endpoints and has been optimized to handle web-scale traffic.

Optimizations:
Implemented an ETL process to migrate over 5GB/13M+ entries into a redesigned postgreSQL database.
Scaled horizontally to a micro-service architecture with 4 AWS EC2 instances.
Installed an NGINX load balancer to distribute traffic across servers and utilize proxy_caching.
