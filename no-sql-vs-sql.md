The need for NoSQL:
- Relational Db were not designed to cope with the scale and agility challenges made to Db schemas as the application grows.
- This made relational db vendrs develop 2 solutions to address the above shortcomings:
1. Manual sharding
Tables are fragmented into smaller physical tables and spread across multiple servers. Developers have to work on deploying multiple relational databases across a number of machines. Application code distribute data, queries and then aggregate the results of data across all the database instances. More importantly, the benefits of the relational database - transactional integrity - is compromised or eliminated when employing manual sharding.

2. Distributed Cache
This is used when the systems are trying to improve their read performance. It doesn't work when the application is dominated by writes or if the application has a good mix of reads and writes.


NoSQL encompasses a lot of database technologies but the following are common features they provide:
1. Dyanmic schemas
NoSQL are built to allow the insertion of data without a predefined schema. 

2. Auto-sharding, replication and integrated caching
"Sharding" a database across many server instances can be achieved with SQL databases, but usually is accomplished through SANs and other complex arrangements for making hardware act as a single server. NoSQL databases, on the other hand, usually support auto-sharding, meaning that they natively and automatically spread data across an arbitrary number of servers, without requiring the application to even be aware of the composition of the server pool. Data and query load are automatically balanced across servers, and when a server goes down, it can be quickly and transparently replaced with no application disruption.

Most NoSQL databases also support automatic replication, meaning that you get high availability and disaster recovery without involving separate applications to manage these tasks.

many NoSQL database technologies have excellent integrated caching capabilities, keeping frequently-used data in system memory as much as possible. This removes the need for a separate caching layer that must be maintained.


NoSQL database types:
1. Key-value stores
Every item in the database is stored as a key value pair. Some key-value stores allow value to have a type.

2. Document databases
Pairs each key with a complex data structure known as a document. Documents can contain many different key-value pairs or key-array pairs, or nested Documents.

3. Wide-column stores
Optimised for queries over large datasets. They store columns of data together instead of rows.

4. Graph stores
Stores information about networks.