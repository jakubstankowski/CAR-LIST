const express = require("express");
const multer = require("multer");


const Car = require("../models/car");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});





router.post("",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const car = new Car({
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    description: req.body.description,
    price: req.body.price,
    telephone: req.body.telephone,
    imagePath: url + "/images/" + req.file.filename
  });

  car.save().then(createdPost => {
    res.status(201).json({
      message: "CAR added successfully",
      car:{
        ...createdPost,
        id: createdPost._id
      }
    });
  });
});

router.put("/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {

    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }



  const car = new Car({
    _id: req.body.id,
    name: req.body.name,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    description: req.body.description,
    price: req.body.price,
    telephone: req.body.telephone,
    imagePath: imagePath
  });

    console.log('CAR  EDIT : ', car);
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
  console.log('PARAMS : ', req.params);
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
