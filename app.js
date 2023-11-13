const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get("/", (req, res, next) => {
  res.render("index.hbs")
})

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers() // .getBeers() is the method provided by punkAPI
    .then(responseFromDB => {
      console.log("Response is:",  responseFromDB);
      res.render("beers.hbs", { beers: responseFromDB });
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log("This is the random beer")
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  console.log('params:', req.params);
  const id = req.params.beerId
  punkAPI
    .getBeer(id)
    .then(responseFromApi => {
      res.render('beer-details.hbs', { beer: responseFromApi });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
