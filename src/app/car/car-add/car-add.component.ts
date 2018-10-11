import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {AppService} from '../../app.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor(public appService: AppService, public dialogRef: MatDialogRef<CarAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}



  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false

    this.appService.car.push(f.value);

    console.log('GET VALUE : ', this.appService.car);



  }

  ngOnInit() {

  }

}
