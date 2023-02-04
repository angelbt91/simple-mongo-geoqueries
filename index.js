const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  City = require('./city.model');

// Connect to Mongo
(async () => {
  await mongoose.connect('mongodb://db:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
})();

// Reads requests with 'long', 'lat' and 'distance' query params and returns close cities
app.get('/', async (req, res) => {
  const { long, lat, distance } = req.query;

  const someParamIsMissing = [long, lat, distance].includes(undefined);
  if (someParamIsMissing) {
    return res.status(400).json({error: 'Include "long", "lat" and "distance" query params'});
  }
  const { limit, page, order } = req.query;

  try {
    const results = await City.find({
      location: {
        $near: {
          $maxDistance: distance,
          $geometry: {
            type: `Point`,
            coordinates: [long, lat]
          }
        }
      }
    })
      .skip(limit * page)
      .sort({ name: order === 'asc' ? -1 : 1 })
      .limit(Number(limit));

    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.listen('3000', () => {
  console.log('App listening on port 3000');
});