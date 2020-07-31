#4 types of DBMS Data Model
- Relational 
- Key-Value
- Column-Oriented Tabular
- Document Oriented

## Key-Value database
- Stores data with data structure of a dictionary (a collection of objects, or records with many fields) or hash-table.
- unlike RDBs that pre-define the data structure in the database as a series of tables containing fields with well-defined data types
- Key-value databases uses far less memory to store the same database
- examples of such databases are graph databases

## Column-Oriented Tabular
- Stores data tables by columns rather than by rows.
  - storing by column is no different from storing by rows for relational DBMS
- both columnar and row databases can use database query languages like SQL to load data and perform queries.
- column storage method allows database to access data it needs to answer a query rather than scanning and discarding unwanted data in rows
  - query performance is increased for certain workloads

- The primary key is the data mapped from rowids.
- operations that retrieve all data for a given object (that is, the entire row) are slower.
  - This is because numerous disk operations to collect data from multiple columns are required from a columnar database
  - In reality, many times only a limited subset of data of data in a row is retrieved (i.e. the first and last names from many rows to build a list of contacts). Data also tend to be sparse with many optional columns

  ## Document oriented
  - inherently a subclass of key-value store. The difference lies in the way data is processed. In key-value store, the data is not visible to the database whereas in a document-oriented system, the database relies on internal structure in the document to extract metadata for better performance.
  - Document databases store all information for a given object in a single instance in the database. 
  - Every stored object can be different from every other