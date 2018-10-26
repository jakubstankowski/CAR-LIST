import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

import { NgForm } from '@angular/forms';
import {CarService} from '../car.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Car} from '../car.model';



@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  enteredName = '';
  enteredModel = '';
  enteredYear = null;
  enteredPrice = null;
  enteredDescription = '';
  enteredMileage = null;
  enteredPhone = null;

  car: Car;
  private editMode = 'create';
  private carId: string;
  public formTitle = 'ADD NEW CAR';
  public  formButtonTitle = 'ADD';





  constructor( public carService: CarService, private  spinner: NgxSpinnerService, private router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('PARAM MAP  EDIT !@#!@#: ', paramMap);

      if (paramMap.has('carId')) {
        this.editMode = 'edit';
        this.carId = paramMap.get('carId');
        this.formTitle = 'EDIT CAR';
        this.formButtonTitle = 'EDIT';

        this.showSpinner();

        this.carService.getEditCar(this.carId).subscribe(carData => {
          console.log('CAR DATA FROM BACKEND : ', carData);
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
        });
        console.log('CAR ID  GET : ', this.carId);
      } else {
        this.editMode = 'create';
        this.carId = null;
        console.log('MODE  !@#!@#!@#!@#!@#: ', this.editMode);

        /*this.postId = null;*/
      }
    });
  }

  onSaveCar(form: NgForm) {
      this.showSpinner();

        if (this.editMode === 'create') {
          this.carService.addCar(form.value.name, form.value.model, form.value.year, form.value.mileage, form.value.description, form.value.price, form.value.telephone);
       } else {
          console.log('MODE  EDIT? ', this.editMode);

          console.log('THIS CAR ID : ', this.carId);
          this.carService.updateCar(
            this.carId,
            form.value.name,
            form.value.model,
            form.value.year,
            form.value.mileage,
            form.value.description,
            form.value.price,
            form.value.telephone);
        }
       this.router.navigate(['/']);
        form.resetForm();
    }


    showSpinner() {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }







}
