const fetch = require('node-fetch'),
    City = require('./city.model'),
    parseString = require('xml2js').parseString,
    mongoose = require('mongoose'),
    MAX_CITIES = 100,
    citiesData = [];

// Connect to Mongo
(async () => {
    await mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
})()

// Fetch an XML with lat, long and city name data n times
// Parse it and store it into the database
for (let i = 0; i < MAX_CITIES; i++) {
    fetch('https://api.3geonames.org/?randomland=yes')
        .then(response => response.text())
        .then(xml => {
            parseString(xml, function (err, result) {
                const data = result.geodata.major[0];

                citiesData.push({
                    name: data.city[0],
                    coordinates: [parseFloat(data.longt[0]), parseFloat(data.latt[0])]
                });

                if (citiesData.length >= MAX_CITIES) {
                    const cities = citiesData.map(city => {
                        return new City({
                            name: city.name,
                            location: {
                                type: 'Point',
                                coordinates: city.coordinates
                            }
                        })
                    });

                    // Save all the Images in the array with insertMany()
                    City.insertMany(cities, (err, result) => {
                        if (err) {
                            return console.log("Error when filling database:", err);
                        } else {
                            return console.log("Database filled:", result);
                        }
                    });
                }
            });
        });
}