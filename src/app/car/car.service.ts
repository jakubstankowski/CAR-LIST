import {Injectable} from '@angular/core';

import {Car} from './car.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {DeleteDoneComponent} from '../material-dialog/delete-done/delete-done.component';
import {MatSnackBar} from '@angular/material';
import {AddDoneComponent} from '../material-dialog/add-done/add-done.component';
import {EditDoneComponent} from '../material-dialog/edit-done/edit-done.component';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient, public spinner: NgxSpinnerService, private router: Router, public snackBar: MatSnackBar) {

  }


  public cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  getCars() {
    this.http
      .get<{ message: string; cars: Car[] }>(
        'http://localhost:3000/api/cars'
      )
      .pipe(map((carData) => {


        return carData.cars.map(car => {
          console.log('car data get cars : ', car);
          return {
            // @ts-ignore
            id: car._id,
            name: car.name,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            description: car.description,
            price: car.price,
            telephone: car.telephone,
            imagePath: car.imagePath
          };
        });
      }))

    .subscribe(transformedCars => {
        this.cars = transformedCars;
        console.log('SUBSCRIPE CARS : ', this.cars);
        this.carsUpdated.next([...this.cars]);
      });


  }

  getCarUpdateListener() {
    console.log('cars get update listener : ', this.carsUpdated);
    return this.carsUpdated.asObservable();
  }


  addCar(name: string, model: string, year: number, mileage: number, description: string, price: number, telephone: number, image: File) {


    const carData = new FormData();
    carData.append('name', name);
    carData.append('model', model);
    // @ts-ignore
    carData.append('year', year);
    // @ts-ignore
    carData.append('mileage', mileage);
    carData.append('description', description);
    // @ts-ignore
    carData.append('price', price);
    // @ts-ignore
    carData.append('telephone', telephone);
    carData.append('image', image, name);

    this.http
      .post<{ message: string, car: Car }>('http://localhost:3000/api/cars', carData)

      .subscribe(responseData => {
        console.log('RESPONSE DATA : ', responseData);
        console.log('CAR " ', responseData.car);
        console.log('response data id !@#!#@!@# : ', responseData.car.id);
        const car: Car = {
          id: responseData.car.id,
          name: name,
          model: model,
          year: year,
          mileage: mileage,
          description: description,
          price: price,
          telephone: telephone,
          imagePath: responseData.car.imagePath
        };

       this.cars.push(car);
        this.carsUpdated.next([...this.cars]);
        this.router.navigate(['/dashboard']);

        setTimeout(() => {
          this.
          snackBar.openFromComponent(AddDoneComponent, {
            duration: 1000,
          });
        }, 500);


      });



  }


  getCar(id: string) {
    console.log('GET CAR  GET !#@#!@!#@#!@!#@!#@ ID : ', id);
    console.log('CARS : ', this.cars);
    return this.http.get<{
      _id: string; name: string; model: string,  year: number, mileage: number, description: string , price: number, telephone: number, imagePath: string}>
    ('http://localhost:3000/api/cars/' + id);

  }



  updateCar(id: string, name: string, model: string, year: number, mileage: number, description: string, price: number, telephone: number, image: File | string) {
    console.log('ID ? ', id);


    let carData: Car | FormData;
    if (typeof image === 'object') {
      carData = new FormData();
      carData.append('id', id);
      carData.append('name', name);
      carData.append('model', model);
      // @ts-ignore
      carData.append('year', year);
      // @ts-ignore
      carData.append('mileage', mileage);
      // @ts-ignore
      carData.append('description', description);
      // @ts-ignore
      carData.append('price', price);
      // @ts-ignore
      carData.append('telephone', telephone);
      carData.append('image', image, name);
    } else {
      // @ts-ignore
      carData = {
        id: id,
        name: name,
        model: model,
        year: year,
        mileage: mileage,
        description: description,
        price: price,
        telephone: telephone,
        imagePath: image
      };
    }


    this.http
      .put('http://localhost:3000/api/cars/' + id, carData)
      .subscribe(response => {
        console.log('RESPONSE : ', response);
        const updatedCars = [...this.cars];
        const oldCarIndex = updatedCars.findIndex(p => p.id === id);

        const car: Car = {
          id: id,
          name: name,
          model: model,
          year: year,
          mileage: mileage,
          description: description,
          price: price,
          telephone: telephone,
          imagePath: ''
        };
        updatedCars[oldCarIndex] = car;
        this.cars = updatedCars;
        this.carsUpdated.next([...this.cars]);
        this.router.navigate(['/dashboard']);

        setTimeout(() => {
          this.
          snackBar.openFromComponent(EditDoneComponent, {
            duration: 1000,
          });
        }, 500);

      });
  } //  END OF UPDATE CAR, PHOTO !@#!@!@#

  deleteCar(carId: string) {
    console.log('CAR ID FROM SERVICE : ', carId);

    this.http.delete('http://localhost:3000/api/cars/' + carId)
      .subscribe(() => {
        this.cars = this.cars.filter(car => car.id !== carId);
        this.carsUpdated.next([...this.cars]);
      });
  }



}


