'use strict';

const express = require('express');


//Load Environment Variables from the .env file
require('dotenv').config();

const app = express();

//add cors - middleware to be able to use with React
const cors = require('cors');
app.use(cors());

//Application Setup
const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.send('Home Page!');
});

const weather = require('./data/weather.json');
app.get('/weather', (request, response) => {
  response.json(weather);
});



//Make sure the server is listening for requests.  Adding http et al. now you can click on the link to see the localhost running
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
