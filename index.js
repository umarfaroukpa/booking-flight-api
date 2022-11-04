const Joi = require('joi');
const {createConnection} = require('mysql')
const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const app = express();


const connection = createConnection({
  host: "localhost",
  user: "yasmarfaq",
  password: "yasmarfaq15",

});

connection.query(`select * from apiflights.users`, (err, res) => {
  return console.log(res)
})

app.use(express.json());

app.use("/", routes);


app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/flights', (req, res) => {
  res.send(flights)
})

// this is a routes for Add/Book a flights 
app.post('/api/flights', (req, res) =>{
  const {error} = validateFlight(req.body) 
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  
  const flight = {
    id: flights.length + 1,
    name: req.body.name
  };
  flight.push(flight);
  res.send(flight);
});

// this is a routes for updating flights
app.put('/api/flights/:id', (req, res) => {
  const flight = flights.find(c => c.id === parseInt(req.params.id));
  if (!flight) res.status(404).send('the flights with the given ID is not found');

  const {error} = validateFlight(req.body) // result.error
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  flight.name = req.body.name;
  res.send(flight)
});

function validateFlight(flight){
  const schema = {
    name: Joi.string().min(3).require()
  };

  return Joi.validate(flight, schema);
}

//this is routes for creating single flights
app.get('/api/flights/:id', (req, res) => {
  const flight = flights.find(c => c.id === parseInt(req.params.id));
  if (!flight) res.status(404).send('the flights with the given ID is not found');
  res.send(flight);
});
 
// this is a routes for deleting flights
app.delete('/api/flights/:id', (req, res) => {
  const flight = flights.find(c => c.id === parseInt(req.params.id));
  if (!flight) res.status(404).send('the flights with the given ID is not found');

  const index = flights.indexOf(flight);
  flight.splice(index, 1);

  res.send(flight);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
