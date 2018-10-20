import { Injectable } from '@angular/core';

import {Car} from  './car.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  public cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  getCars(){

    this.http
      .get<{ message: string; cars: Car[] }>(
        "http://localhost:3000/api/cars"
      )
      .subscribe(postData => {
        this.cars = postData.cars;
        this.carsUpdated.next([...this.cars]);
      });
  }

  getCarUpdateListener() {
    return this.carsUpdated.asObservable();
  }

  addCar(name: string, model: string, year: number, mileage: number, description: string, price: number, telephone: number) {
    console.log('name: ', name, 'model: ', model, 'year : ', year, 'mileage : ', mileage, 'description:', description, 'price : ', price, 'telephone', telephone);

    const car: Car ={id: null, name: name, model: model, year: year, mileage: mileage, description: description, price: price, telephone: telephone};


    this.http
      .post<{ message: string }>("http://localhost:3000/api/cars", car)
      .subscribe(responseData => {
        console.log('RESPONSE DATA TO POST FOR BACKEND :  ',responseData.message);
        this.cars.push(car);

        console.log('CAR : ', car);

        this.carsUpdated.next([...this.cars]);
      });

  }





}


