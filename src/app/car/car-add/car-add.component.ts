import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

import { NgForm } from '@angular/forms';
import {CarService} from '../car.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';



@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor( public carService: CarService, private  spinner: NgxSpinnerService, private router: Router,) {}

  onSubmit(form: NgForm) {
    setTimeout(() => {
      this.carService.addCar(form.value.name, form.value.model, form.value.year, form.value.mileage, form.value.description, form.value.price, form.value.telephone);
      this.router.navigate(['/']);
      form.resetForm();
    }, 1000);
  }

  ngOnInit() {

  }

}
