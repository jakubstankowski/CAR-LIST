const express = require("express");

const Car = require("../models/car");

const router = express.Router();

router.post("", (req, res, next) => {
  const car = new Car({
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    description: req.body.description,
    price: req.body.price,
    telephone: req.body.telephone
  });

  car.save().then(createdPost => {
    res.status(201).json({
      message: "CAR added successfully",
      carId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const car = new Car({
    _id: req.body.id,
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    description: req.body.description,
    price: req.body.price,
    telephone: req.body.telephone
  });
  Car.updateOne({ _id: req.params.id }, car).then(result => {
    console.log('RESULT : ', result);
    res.status(200).json({ message: "UPDATE SUCCESS ! " });
  });
});

router.get("", (req, res, next) => {
  Car.find().then(documents => {
    res.status(200).json({
      message: "CARS fetched successfully!",
      cars: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Car.findById(req.params.id).then(car => {
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "CAR NOT FOUND ! " });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Car.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "CAR DELETE ! " });
  });
});

module.exports = router;
