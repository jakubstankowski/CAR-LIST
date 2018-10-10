import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {AppService} from '../../app.service';




@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  constructor(public appService: AppService, public dialogRef: MatDialogRef<CarAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}



  ngOnInit() {

  }

}
