// MONGDO DB PASSWORD  : KvOnZlZH3Wj5tGS8
//  MONGO DB LOGIN : standev

const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require("mongoose");

const Car = require("./models/car");
const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post("/api/cars", (req, res, next) => {
  const car = new Car({
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    description: req.body.description,
    price: req.body.price,
    telephone: req.body.telephone

  });

  car.save().then(addedCar => {
    console.log('ADDED CAR : ', addedCar._id);
    res.status(201).json({
      message: "CAR added successfully",
      carId: addedCar._id
    });
  });

});



app.get('/api/cars',(req, res, next) => {

  Car.find().then(data => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      cars: data
    });
  });

});



app.delete("/api/cars/:id", (req, res, next) => {
  Car.deleteOne({ _id: req.params.id }).then(result => {
    console.log('DELETE RESULT : ', result);
    res.status(200).json({ message: "CAR deleted!" });
  });
});




module.exports = app;


