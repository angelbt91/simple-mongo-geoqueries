const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    City = require('./city.model');

// Connect to Mongo
(async () => {
    await mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
})()

// Reads requests with 'long', 'lat' and 'distance' query params and returns close cities
app.get('/', (req, res) => {
    const long = req.query.long,
        lat = req.query.lat,
        distance = req.query.distance;

    City.find({
        location: {
            $near: {
                $maxDistance: distance,
                $geometry: {
                    type: `Point`,
                    coordinates: [long, lat]
                }
            }
        }
    }).find((error, results) => {
        if (error) {
            return res.status(400).send(error);
        }

        return res.status(200).json(results);
    });
});

app.listen('3000', () => {
    console.log('App listening on port 3000');
});