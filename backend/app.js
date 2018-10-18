const express = require('express');
const bodyParser  = require('body-parser');



// MONGDO DB PASSWORD  : uIWp1zljJsD9y82g
//  MONGO DB LOGIN : standev



const app = express();

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
  const car = req.body;

  console.log('CAR FROM INPUT : ', car);

  res.status(201).json({
    message: 'CAR added successfully @!##@!#!@'
  });

  next();


});



app.get('/api/cars',(req, res, next) => {

  const cars = [

    {
      id: '1',
      name:'AUDI',
      model:'A4',
      price:'12000'
    },
    {
      id: '2',
      name:'POLONEZ ',
      model:'CARO',
      price:'12000'
    },
    {
      id: '3',
      name:'VW',
      model:'GOLF',
      price:'1000'
    },
    {
      id: '3',
      name:'polonez',
      model:'caro',
      price:'1000'
    }




  ];
  res.json({
   message: 'FROM JSON API :  ',
   cars:cars,
 })

});


module.exports = app;


