import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-car-delete-dialog',
  templateUrl: './car-delete-dialog.component.html',
  styleUrls: ['./car-delete-dialog.component.css']
})
export class CarDeleteDialogComponent  {

  constructor( public dialogRef: MatDialogRef<CarDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


}
