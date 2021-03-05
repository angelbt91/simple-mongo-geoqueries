# Simple Mongo Geoqueries

## Usage

Make a GET request to `/` with `lat`, `long` and `distance` query parameters to receive back a JSON with the cities on your database that are inside the area specified.

## Installing

Install dependencies:

`$ npm install`

Start Mongodb with Docker:

`$ sudo docker run -it -p 27017:27017 --name geoqueries-mongodb -d mongo`

Start local server:

`$ npm start`

Fill database with cities:

`$ npm run fill`