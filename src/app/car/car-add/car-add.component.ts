import { Component, OnInit} from '@angular/core';

import { NgForm } from '@angular/forms';
import {CarService} from '../car.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Car} from '../car.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {max} from 'rxjs/operators';
import {mimeType} from './mime-type.validator';





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
  imagePreview: string;
  form: FormGroup;
  car: Car;
  private editMode = 'create';
  private carId: string;
  public formTitle = 'ADD NEW CAR';
  public  formButtonTitle = 'ADD';
  imageIsLoad = false;


  constructor( public carService: CarService, private  spinner: NgxSpinnerService, private router: Router, public route: ActivatedRoute) {}

  ngOnInit() {


    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      model: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, {validators: [Validators.required/*, Validators.min(1900), Validators.max(2020)*/]}),
      mileage: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
      price: new FormControl(null, {validators: [Validators.required, Validators.max(10000000)]}),
      telephone: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),

    });

    console.log('FORM : ', this.form);



    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log('PARAM MAP  EDIT !@#!@#: ', paramMap);

      if (paramMap.has('carId')) {
        this.editMode = 'edit';
        this.carId = paramMap.get('carId');
        this.formTitle = 'EDIT CAR';
        this.formButtonTitle = 'EDIT';

        this.carService.getCar(this.carId).subscribe(carData => {
          console.log('CAR DATA FROM BACKEND : ', carData);
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

          this.form.setValue({
            name: this.car.name,
            model: this.car.model,
            year: this.car.year,
            mileage: this.car.mileage,
            description: this.car.description,
            price: this.car.price,
            telephone: this.car.telephone,
            image: this.car.imagePath
          });
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


  onImagePicked(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});

    console.log('FORM  ', this.form);
    console.log('form get image : ', this.form.get('image'));


    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imageIsLoad = true;
    };

    reader.readAsDataURL(file);


  }
  onSaveCar() {

    if (this.form.invalid) {
      return;
    }


    console.log('SAVE CAR WORKING ? ');

   /* this.carService.showSpinner();*/
    if (this.editMode === 'create') {
      this.carService.addCar(this.form.value.name, this.form.value.model, this.form.value.year, this.form.value.mileage, this.form.value.description, this.form.value.price, this.form.value.telephone, this.form.value.image);
    } else {
      this.carService.updateCar(
        this.carId,
        this.form.value.name,
        this.form.value.model,
        this.form.value.year,
        this.form.value.mileage,
        this.form.value.description,
        this.form.value.price,
        this.form.value.telephone,
        this.form.value.image
      );
    }
    /*this.form.reset();*/
  }










}
