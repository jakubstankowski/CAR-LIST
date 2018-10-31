// MONGDO DB PASSWORD  : KvOnZlZH3Wj5tGS8
//  MONGO DB LOGIN : standev

const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require("mongoose");
const path = require("path");


const app = express();
const carsRoutes = require("./routes/car");


mongoose
  .connect(
    "mongodb+srv://standev:KvOnZlZH3Wj5tGS8@cluster0-rr3fg.gcp.mongodb.net/car-list?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


/*app.use('/', (req, res, next) => {
  res.send('WELCOME TO API CAR LIST');
});*/



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/cars", carsRoutes);

module.exports = app;


