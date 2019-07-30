What is the ELK stack?

It is used to conduct quick, powerful time-series analytics AND maintain this blazing fast analytics as your data grows larger and larger

ELK stack consist of Elasticsearch, Logstash and Kibana
Elasticsearch does distributed search
Logstash does normalization of all kinds of time series data
Kibana is a visualization tool.

It is versatile stack that can be used as a stand-alone application or integrated with your existing applications to get the most current data.

Using Elasticsearch as a backend datastore and Kibana as a frontend dashboard (see below), Logstash will serve as the workhorse for storage, querying and analysis of your logs. Since it has an arsenal of ready-made inputs, filters, codecs, and outputs, you can grab hold of a very powerful feature-set with a very little effort on your part.

Think of Logstash as a pipeline for event processing: it takes precious little time to choose the inputs, configure the filters, and extract the relevant, high-value data from your logs. Take a few more steps and it will make it available to Elasticsearch

Lucene (or Apache Lucene)
- is a free, open-sourced information retrieval software **library** 

- While suitable for any application that requires full text indexing and searching capability, Lucene has been widely recognized for its utility in the implementation of Internet search engines and local, single-site searching.

- Lucene includes a feature to perform a fuzzy search based on edit distance.

- Lucene has also been used to implement recommendation systems.

- At the core of Lucene's logical architecture is the idea of a document containing fields of text. This flexibility allows Lucene's API to be independent of the file format. Text from PDFs, HTML, Microsoft Word, Mind Maps, and OpenDocument documents, as well as many others (except images), can all be indexed as long as their textual information can be extracted.

Solr (Apache Solr)
- is an opensource enterprise search platform written in Java, from the Apache Lucene project. Lucene and Solr projects later merged and they are now referred to as Solr/Lucene

- Solr is bundled as the built-in search in many applications such as content management systems and enterprise content management systems. Hadoop distributions from Cloudera, Hortonworks and MapR all bundle Solr as the search engine for their products marketed for big data. DataStax DSE integrates Solr as a search engine with Cassandra. Solr is supported as an end point in various data processing frameworks and Enterprise integration frameworks.

- Solr exposes industry standard HTTP REST-like APIs with both XML and JSON support, and will integrate with any system or programming language supporting these standards. For ease of use there are also client libraries available for Java, C#, PHP, Python, Ruby and most other popular programming languages

Apache Solr is a powerful tool with tremendous search capability. In order to search a document, it performs following operations in sequence:

1. Indexing: First of all, it converts the documents into a machine-readable format which is called Indexing.

2. Querying: Understanding the terms of a query asked by the user. These terms can be images, keywords, and much more.

3. Mapping: Solr maps the user query to the documents stored in the database to find the appropriate result.

4. Ranking the outcome: As soon as the engine searches the indexed documents, it ranks the outputs as per their relevance.

