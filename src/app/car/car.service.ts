import { Injectable } from '@angular/core';

import {Car} from  './car.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';



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
      .pipe(map((carData) => {
        return carData.cars.map(car => {

          // @ts-ignore
          return {
            id: car._id,
            name:car.name,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            description: car.description,
            price: car.price,
            telephone: car.telephone
          };
        });
      }))

    .subscribe(transformedPosts => {
        this.cars = transformedPosts;
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
      .post<{ carId: string, message: string }>("http://localhost:3000/api/cars", car)
      .subscribe(responseData => {
        console.log('RESPONSE DATA : ', responseData);
        const id = responseData.carId;
        car.id = id;
        this.cars.push(car);
        this.carsUpdated.next([...this.cars]);
      });

  }

  deleteCar(carId: string) {
    console.log('CAR ID FROM SERVICE : ', carId);

    this.http.delete("http://localhost:3000/api/cars/" + carId)
      .subscribe(() => {
        console.log('THERE IS ERROR FROM DELETE CAR ! ');
        const updatedCars = this.cars.filter(car => car.id !== carId);
        this.cars = updatedCars;
        this.carsUpdated.next([...this.cars]);
      });
  }





}


