const express = require('express');

const hbs = require('hbs');
const { dirname } = require('path');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static(path.join(__dirname + '/public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + '/views/partials'))

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    title : "IronBeers",
    css : ['home'],
  });
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
       console.log(beersFromApi)
      
      res.render('beers', {
        title : "Beers",
        css : ['beers'],
        beers: beersFromApi })
    })
    .catch(error => console.log(error))
})

app.get('/random-beers', (req, res) => {

  punkAPI
    .getRandom()
    .then(randomBeer => {

      res.render('random-beers', {
        title : "Random Beers",
        css : ['randombeers'],
        randombeer : randomBeer })
    }) 
    .catch(error => console.log(error))
})

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id

  punkAPI
    .getBeer(beerId)
    .then(beerFromApi => {
      
      res.render('details-beer', {
        title : `Details of ${beerFromApi[0].name}`,
        css : ['details-beer'],
        beer : beerFromApi })
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => console.log('🏃‍ on port http://localhost:3000'));
