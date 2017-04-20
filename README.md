# SearchEngine

## Requirement
1. splinter
2. Selenium
3. requests
4. geckodriver
5. NodeJS
6. ElasticSearch

## File Structure
1. crawl: includes the code of crawlers for raw data and metadata.
2. index: includes the code for convert metadata and csv files to json files. And the command for importing data and quering in Elasticsearch.
3. public: include the code for UI.

## How To Run
1. replace /etc/elasticsearch/elasticsearch.yml with elasticsearch.yml
2. start ElasticSearch: sudo service elasticsearch start
3. import metadata: bulk meta.json
4. import line data: unzip data in index directory and run lineData.py
5. To download node modules write npm install
6. To run server write node server.js
7. To access UI go to localhost:3333
