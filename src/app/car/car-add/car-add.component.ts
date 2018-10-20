import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

import { NgForm } from '@angular/forms';
import {CarService} from '../car.service';
import {NgxSpinnerService} from 'ngx-spinner';



@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor( public carService: CarService, public dialogRef: MatDialogRef<CarAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private  spinner: NgxSpinnerService) {}




  showSpinnerAfterAdd(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  onSubmit(form: NgForm) {
    setTimeout(() => {
      this.carService.addCar(form.value.name, form.value.model, form.value.year, form.value.mileage, form.value.description, form.value.price, form.value.telephone);
      this.dialogRef.close();
      form.resetForm();
    }, 1000);
  }

  ngOnInit() {

  }

}
