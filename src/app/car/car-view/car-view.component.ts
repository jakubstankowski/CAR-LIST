import { Component, OnInit } from '@angular/core';
import {Car} from '../car.model';
import {CarService} from '../car.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  car: Car;
  public carId = null;
  showTelephoneStatus = false;

  constructor(public carService: CarService, public route: ActivatedRoute, private router: Router) {
    console.log('CARS : ', carService.cars);
  }

  backToCarList(){
    this.router.navigate(['/']);
  }


  showTelephone(){

    this.showTelephoneStatus = true;
  }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
     /* this.carService.showSpinner();*/

      console.log('PARAM MAP VIEW !@#!@# : ', paramMap);

      this.carId = paramMap.get('carId');


      if (paramMap.has('carId')) {
        console.log('ID : ', this.carId);
        this.carService.getCar(this.carId).subscribe(carData =>{
          console.log('GET DATA FROM BACKEND : ', carData);
          this.car = {
            id: carData._id,
            name: carData.name,
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage,
            description: carData.description,
            price: carData.price,
            telephone: carData.telephone,
            imagePath: carData.imagePath,
          };
          console.log('CAR DATA VIEW !@#!@#!@#!@#  : ', this.car);
        })

      } else {
        console.log('NIE MA CAR ID  !');


      }

    });

  } //  end of NG ON INIT

}
