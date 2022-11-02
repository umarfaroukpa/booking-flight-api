const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

// const flight = [
//   {
//     title: "flight to canada",
//     time: 1,
//     price: 26000,
//     date: "26-06-2022"
//   }
// ];

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/flights', (req, res) => {
  res.send(flights)
})

//this is routes for creating single flights
app.get('/api/flights/:id', (req, res) => {
  const flights = flights.find(f => f.id === parseInt(req.params.id));
  if (!flights) res.status(404).send('the flights with the given ID is not found');
  res.send(flights);
});
 
app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
