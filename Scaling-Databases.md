Scaling Databases
Naive method:
Continue using MySQL. Scale with master-slave architecture, where slave servers handle reads and master server handle writes.
- You will then encounter the problem of slow write and go into the loop of adding more RAM to master server

Better method:
You denormalize your database. This means you stop making your database fetch join queries. Instead, you do the joining in your application.
- You can stay with MySQL or move to NoSQL db
- Eventually, fetching from db will be too slow (too many read requests). You will then introduce a cache

Caching
A cache is a key value store. It is a layer between your application and database
- don't do file based caching, it makes it difficult to clone and scale your servers as you will need to duplicate the cache files
- use in-memory caches like Memcached or Redis

Caching strategy:
Cache database queries results
- query from db only if the cache does not contain the required data
- Difficulty in updating cache. If a single cell is updated, all caches that use that cell's result will need to be updated.

Cache objects
- Instead of storing query results in cache, store the object which assembled the dataset from your database in cache

Using Asynchronisity to increase performance
1. Pre-rendering. Doing time consuming work in advance
- we can have a cron job hourly generating static HTML pages from dynamic pages 

2. Like the frontend events architecture, have a list of tasks where workers threads will pick up and execute when they are free