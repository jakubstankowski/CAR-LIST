import { Component, OnInit } from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  car: Car;
  showNumber = false;
  hideButton = false;
  public carId = null;

  constructor(public carService: CarService, public route: ActivatedRoute) {
    console.log('CARS : ', carService.cars);
  }

  showTelephone(){
    this.showNumber = true;
    this.hideButton = true;
  }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('PARAM MAP VIEW !@#!@# : ', paramMap);
      this.carId = paramMap.get('carId');


      if (paramMap.has('carId')) {
        console.log('ID : ', this.carId);
        this.carService.getViewCar(this.carId).subscribe(carData =>{
          console.log('GET DATA FROM BACKEND : ', carData);
          this.car = {
            id: carData._id,
            name: carData.name,
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage,
            description: carData.description,
            price: carData.price,
            telephone: carData.telephone
          };
          console.log('CAR DATA : ', this.car);
        })

      } else {
        console.log('NIE MA CAR ID  !');


      }

    });

  }

}
