import {Injectable} from '@angular/core';

import {Car} from './car.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient, public spinner: NgxSpinnerService) {

  }


  public cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  showSpinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  getCars(){
    this.http
      .get<{ message: string; cars: Car[] }>(
        "http://localhost:3000/api/cars"
      )
      .pipe(map((carData) => {
        return carData.cars.map(car => {
          return {
            // @ts-ignore
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


  getViewCar(id: string){
    console.log('OTRZYMAŁEM ID : ', id);
    return this.http.get<{ _id: string; name: string; model: string,  year: number, mileage :number, description: string ,price: number, telephone: number}>
    ("http://localhost:3000/api/cars/" + id);
  }

  getEditCar(id: string) {

    console.log('GET CAR  GET !#@#!@!#@#!@!#@!#@ ID : ', id);
    console.log('CARS : ', this.cars);
    return this.http.get<{ _id: string; name: string; model: string,  year: number, mileage :number, description: string ,price: number, telephone: number}>
    ("http://localhost:3000/api/cars/" + id);

  };



  updateCar(id: string, name: string, model: string, year: number, mileage: number, description: string, price: number, telephone: number){
    console.log('ID ? ', id);
    const car: Car = { id: id, name: name, model: model, year: year, mileage: mileage, description: description, price: price, telephone: telephone };
    this.http
      .put("http://localhost:3000/api/cars/" + id, car)
      .subscribe(response => {
        console.log('RESPONSE : ', response);
        const updatedCars = [...this.cars];
        const oldCarIndex = updatedCars.findIndex(p => p.id === car.id);
        updatedCars[oldCarIndex] = car;
        this.cars = updatedCars;
        this.carsUpdated.next([...this.cars]);
        /*this.router.navigate(["/"]);*/

      });
  }

  deleteCar(carId: string) {
    console.log('CAR ID FROM SERVICE : ', carId);

    this.http.delete("http://localhost:3000/api/cars/" + carId)
      .subscribe(() => {
        this.cars = this.cars.filter(car => car.id !== carId);
        this.carsUpdated.next([...this.cars]);
      });
  }



}


