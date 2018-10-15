import { Injectable } from '@angular/core';

import {Car} from  './car.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  private cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  getCars(){
    return [...this.cars];
  }

  getCarUpdateListener() {
    return this.carsUpdated.asObservable();
  }

  addPost(name: string,
          model: string,
          year: number,
          mileage: number,
          description: string,
          price: number,
          telephone: number)


  {

   console.log(
     'name: ', name,
     'model: ', model,
     'year : ', year,
     'mileage : ', mileage,
     'description:', description,
     'price : ', price,
     'telephone', telephone
   );


   const car: Car ={
     name: name,
     model: model,
     year: year,
     mileage: mileage,
     description: description,
     price: price,
     telephone: telephone
   };

   this.cars.push(car);

   console.log('CAR NAME  : ', this.cars);

   this.carsUpdated.next([...this.cars]);

  }
}
